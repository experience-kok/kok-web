import Image from 'next/image';

import { AspectRatio } from 'components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from 'components/ui/card';
import { Text } from 'components/ui/text';

import ApplicatnsCount from './applicants-count';
import CampaignTypeBadge from './campaign-type-badge';
import LikeButton from './like-button';
import ProgressBar from './progress-bar';

/**
 * 캠페인 카드 컴포넌트
 */
export default function CampaignCard() {
  const testurl =
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  return (
    <Card className="gap-2 border-none py-0 shadow-none">
      <CardContent className="group relative cursor-pointer overflow-hidden rounded-lg p-0">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={testurl}
            alt={`testurl`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>
        <div className="absolute right-2 bottom-2">
          <LikeButton />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        <div className="scrollbar-hide mb-2 flex w-full items-center gap-2 overflow-x-auto">
          <CampaignTypeBadge campaignType="YOUTUBE" />
          <CampaignTypeBadge campaignType="NAVER_BLOG" />
          <CampaignTypeBadge campaignType="INSTAGRAM" />
          <CampaignTypeBadge campaignType="OTHER" />
        </div>
        <Text className="line-clamp-2">
          [전국] 맘스터치 에드워드리 빅싸이순살 다리살? 아니 닭가슴살
        </Text>
        <Text size="sm" color="muted-foreground" weight="semibold" className="mb-2">
          치킨 메뉴 교환권
        </Text>
        <div className="flex w-full justify-end">
          <ApplicatnsCount maxApplicants={10} currentApplicants={25} />
        </div>
        {/* <ProgressBar currentApplicants={25} maxApplicants={10} /> */}
      </CardFooter>
    </Card>
  );
}
