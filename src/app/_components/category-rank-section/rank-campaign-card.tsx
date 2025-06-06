import Image from 'next/image';

import ApplicatnsCount from 'components/shared/campaign-card/applicants-count';
import CampaignTypeBadge from 'components/shared/campaign-card/campaign-type-badge';
import LikeButton from 'components/shared/campaign-card/like-button';
import ProgressBar from 'components/shared/campaign-card/progress-bar';
import { AspectRatio } from 'components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from 'components/ui/card';
import { Text } from 'components/ui/text';

interface Props {
  ranking: number;
}

/**
 * 랭킹 캠페인 카드 컴포넌트
 */
export default function RankCampaignCard({ ranking }: Props) {
  const testurl =
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  return (
    <Card className="flex-row gap-2 border-none py-0 shadow-none">
      <CardContent className="group relative h-[115px] w-[115px] cursor-pointer overflow-hidden rounded-lg p-0 md:h-[135px] md:w-[135px]">
        <AspectRatio ratio={1 / 1} className="h-full w-full">
          <Image
            src={testurl}
            alt={'test'}
            fill
            sizes="115px"
            className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>
        <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-md bg-black/70">
          <Text className="text-white" size="sm" weight="bold">
            {ranking}
          </Text>
        </div>
        <div className="absolute right-2 bottom-2">
          <LikeButton />
        </div>
      </CardContent>
      <CardFooter className="flex-1 flex-col items-start justify-start">
        <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
          <CampaignTypeBadge campaignType="YOUTUBE" />
          <CampaignTypeBadge campaignType="NAVER_BLOG" />
        </div>
        <Text className="line-clamp-2">
          [4월 올영픽/파우치 증정] 메디힐 마데카소사이드 흔적 리페어 세럼 40+40mL 토이스토리 에디션
        </Text>
        <div className="mb-2 flex items-center gap-1">
          <Text size="sm" color="primary" weight="bold">
            1일 남음
          </Text>
          <Text size="sm" color="muted-foreground" weight="semibold">
            치킨 메뉴 교환권
          </Text>
        </div>
        <div className="flex w-full justify-end">
          <ApplicatnsCount currentApplicants={7} maxApplicants={10} />
        </div>
      </CardFooter>
    </Card>
  );
}
