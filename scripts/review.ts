import { readFileSync } from 'fs';

import { Octokit } from '@octokit/rest';
import { OpenAI } from 'openai';

const OPENAI_API_KEY: string = process.env['OPENAI_API_KEY'] as string;
const GITHUB_TOKEN: string = process.env['GITHUB_TOKEN'] as string;

if (!OPENAI_API_KEY || !GITHUB_TOKEN) {
  throw new Error('필수 환경변수(OPENAI_API_KEY, GITHUB_TOKEN)가 설정되지 않았어요.');
}

// OpenAI 인스턴스 생성
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Octokit 인스턴스 생성
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

interface PRData {
  owner: string;
  repo: string;
  pull_number: number;
  title: string;
  description: string;
}

// PR 정보를 가져오는 함수
async function getPrData(): Promise<PRData> {
  // GitHub Actions가 제공하는 이벤트 JSON을 객체로 파싱
  const githubEventPath: string = process.env['GITHUB_EVENT_PATH'] as string;
  if (!githubEventPath) {
    throw new Error('GITHUB_EVENT_PATH가 설정되어 있지 않습니다.');
  }

  const { repository, number } = JSON.parse(readFileSync(githubEventPath, 'utf8'));

  // PR 정보 요청
  const prResponse = await octokit.rest.pulls.get({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
  });

  return {
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: number,
    title: prResponse.data.title ?? '',
    description: prResponse.data.body ?? '',
  };
}

async function main() {
  // PR 정보 가져오기
  const prData = await getPrData();

  // 이벤트 타입 감지
  const githubEventPath = process.env['GITHUB_EVENT_PATH']!;
  const githubEvent = JSON.parse(readFileSync(githubEventPath, 'utf8'));

  if (githubEvent.action === 'opened') {
  } else if (githubEvent.action === 'synchronize') {
  }
}

main();
