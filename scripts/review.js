import { execSync } from 'child_process';

import { config } from 'dotenv';
import { OpenAI } from 'openai';

config();

// !TODO 깃에 올릴때는 next_public 제거
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

/** 변경된 파일 목록을 가져옴 */
function getChangedFiles() {
  const output = execSync('git diff --name-only origin/develop...HEAD').toString();
  console.log(output.split('\n').filter(Boolean));
  return output.split('\n').filter(Boolean);
}

/** 특정 파일의 diff 내용 추출 */
function getFileDiff(file) {
  try {
    return execSync(`git diff develop -- ${file}`).toString();
  } catch (err) {
    console.error(`❌ ${file} diff 에러`, err);
    return '';
  }
}

/** GPT에게 리뷰 요청 */
async function reviewCode(filename, diff) {
  const prompt = `아래는 ${filename} 파일의 코드 변경 내용입니다. 이 변경사항에 대해 코드 리뷰를 해주세요:\n\n${diff}`;
  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: '당신은 경험 많은 코드 리뷰어입니다.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 800,
  });

  return chat.choices[0].message.content;
}

(async () => {
  const files = getChangedFiles();
  if (files.length === 0) {
    console.log('🔍 변경된 파일이 없습니다.');
    return;
  }

  for (const file of files) {
    const diff = getFileDiff(file);
    console.log(diff);

    // if (diff.length > 4000) {
    //   console.log(`⚠️ ${file}의 변경 내용이 너무 깁니다. 일부만 분석합니다.`);
    // }

    // const trimmedDiff = diff.slice(0, 4000); // 안전하게 자르기

    // console.log(`\n📄 [${file}] 코드 리뷰 요청 중...\n`);
    // try {
    //   const review = await reviewCode(file, trimmedDiff);
    //   console.log(`🤖 리뷰 결과:\n${review}\n`);
    // } catch (e) {
    //   console.error(`❌ ${file} 리뷰 실패:`, e.message);
    // }
  }
})();
