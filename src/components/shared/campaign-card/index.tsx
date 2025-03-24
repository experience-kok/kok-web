import Image from 'next/image';

import { AspectRatio } from 'components/ui/aspect-ratio';
import { Card, CardContent, CardFooter } from 'components/ui/card';
import { Text } from 'components/ui/text';

import LikeButton from './like-button';
import ProgressBar from './progress-bar';
import ShareButton from './share-button';

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
          <div className="absolute right-2 bottom-2">
            <LikeButton />
            {/* <ShareButton /> */}
          </div>
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-0">
        <Text className="line-clamp-2">
          [전국] 맘스터치 에드워드리 빅싸이순살 다리살? 아니 닭가슴살
        </Text>
        <Text size="sm" color="muted-foreground" weight="semibold" className="mb-4">
          치킨 메뉴 교환권
        </Text>
        <ProgressBar currentApplicants={25} maxApplicants={10} />
      </CardFooter>
    </Card>
  );
}
