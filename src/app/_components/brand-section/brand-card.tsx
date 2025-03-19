import Image from 'next/image';

import { AspectRatio } from 'components/ui/aspect-ratio';

/**
 * 메인 페이지 브랜드관 섹션에 사용되는 카드 컴포넌트
 */
export default function BrandCard() {
  const testurl =
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  return (
    <AspectRatio>
      <Image
        src={testurl}
        alt={`testurl`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-lg object-cover"
      />
    </AspectRatio>
  );
}
