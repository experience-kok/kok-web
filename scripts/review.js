import { execSync } from 'child_process';

import { config } from 'dotenv';
import { OpenAI } from 'openai';

config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 제외할 파일 또는 패턴
const excludePatterns = ['.json', 'yarn.lock', 'tsconfig.json', '.md', '.yml'];

// 변경된 파일 목록을 반환하는 함수
function getChangedFiles() {
  const output = execSync('git diff --name-only origin/develop...HEAD').toString();
  const files = output.split('\n').filter(Boolean);
  return files.filter(file => !excludePatterns.some(pattern => file.endsWith(pattern)));
}

// 변경된 파일들을 develop 브랜치와 비교하는 함수 (변경된 줄만 포함)
function getFileDiff(file) {
  try {
    return execSync(`git diff origin/develop...HEAD --unified=0 -- ${file}`).toString();
  } catch (err) {
    console.error(`❌ ${file} diff 에러`, err);
    return '';
  }
}

// 프롬프트 생성 함수
function createPrompt(fileName, diff, prTitle = '제목 없음', prDescription = '설명 없음') {
  return `당신의 역할은 Pull Request 코드 변경 사항을 리뷰하는 것입니다. 다음 지침을 반드시 따르세요:

- 응답은 아래 형식의 **JSON 객체**로 작성해야 합니다:  
\`\`\`json
{
  "reviews": [
    {
      "lineNumber": <라인 번호>,
      "reviewComment": "<리뷰 코멘트>"
    }
  ]
}
\`\`\`
- 코드에 개선할 부분이 **명확히 있을 경우에만** 리뷰 코멘트를 작성하고, 없다면 \`"reviews"\` 배열은 **빈 배열**이어야 합니다.
- 긍정적인 피드백이나 칭찬은 절대 하지 마세요.
- 리뷰 코멘트는 **GitHub Markdown 형식**으로 작성하세요.
- PR 제목과 설명은 **전반적인 맥락을 파악하는 용도**로만 참고하고, **리뷰는 오직 코드 자체에 대해서만** 작성하세요.
- 절대 “코드에 주석(comment)을 추가하라”는 제안을 하지 마세요.
- **함수명이나 변수명이 명확하지 않을 경우**, 어떤 이름이 더 적절할지 **구체적으로 예시를 들어 제안하세요.**
- **리뷰 코멘트는 반드시 한국어로 작성하세요.**

다음은 파일 "${fileName}"에서 변경된 코드입니다. PR의 제목과 설명을 함께 참고하여 리뷰를 작성하세요.

🔹 Pull Request 제목: ${prTitle}  
🔹 Pull Request 설명:

---
${prDescription}
---

🔍 리뷰 대상 Git diff:

\`\`\`diff
${diff}
\`\`\`
`;
}

// GPT에 리뷰 요청
async function reviewCode(fileName, diff) {
  const prompt = createPrompt(fileName, diff);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: '당신은 신중하고 경험 많은 코드 리뷰어입니다.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
}

// 실행 로직
(async () => {
  execSync('git fetch origin');

  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    console.log('✅ 변경된 파일이 없습니다.');
    return;
  }

  for (const file of changedFiles) {
    const diff = getFileDiff(file);

    if (!diff || diff.length === 0) {
      continue;
    }

    const trimmedDiff = diff.length > 4000 ? diff.slice(0, 4000) + '\n... (생략됨)' : diff;

    console.log(`\n📄 [${file}] 코드 리뷰 요청 중...\n`);

    try {
      const review = await reviewCode(file, trimmedDiff);
      console.log(`🤖 리뷰 결과:\n${review}\n`);
    } catch (err) {
      console.error(`❌ ${file} 리뷰 실패: ${err.message}`);
    }
  }
})();
