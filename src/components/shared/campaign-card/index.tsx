import Image from 'next/image';

import { AspectRatio } from 'components/ui/aspect-ratio';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { Text } from 'components/ui/text';

import LikeButton from './like-button';
import ProgressBar from './progress-bar';
import ShareButton from './share-button';

/**
 * 캠페인 카드 컴포넌트
 */
export default function CampaignCard() {
  const testurl =
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  return (
    <Card className="pt-0">
      <CardContent className="p-0">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={testurl}
            alt={`testurl`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {/* 아이콘 영역 */}
        <div className="flex items-center gap-2">
          <LikeButton />
          <ShareButton />
        </div>
        <Text weight="semibold" className="mt-2">
          [전국] 맘스터치 에드워드리 빅싸이순살
        </Text>
        <Text size="xs" color="muted" weight="semibold" className="mb-4">
          치킨 메뉴 교환권
        </Text>
        <ProgressBar currentApplicants={25} maxApplicants={10} />
      </CardFooter>
    </Card>
  );
}
