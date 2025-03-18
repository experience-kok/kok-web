import CampaignCard from 'components/shared/campaign-card';
import { Carousel, CarouselContent, CarouselItem } from 'components/ui/carousel';

/**
 * 메인 페이지 인기 캠페인 섹션 컴포넌트
 */
export default function PopularSection() {
  return (
    <Carousel
      className="mx-auto w-full"
      opts={{
        align: 'start',
        dragFree: true,
        loop: false,
      }}
    >
      <CarouselContent className="-ml-4">
        {new Array(7).fill(0).map((_, index) => (
          <CarouselItem key={index} className="basis-[38%] pl-4 md:basis-[1/3]">
            <CampaignCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
