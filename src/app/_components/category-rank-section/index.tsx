'use client';

import { useCallback, useEffect, useState } from 'react';

import { Button } from 'components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from 'components/ui/carousel';

import RankCampaignCard from './rank-campaign-card';

/**
 * 메인 페이지 카테고리 랭킹 섹션 컴포넌트
 */
export default function CategoryRankSection() {
  const categories = [
    '뷰티',
    '헬스&푸드',
    '라이프',
    '패션',
    '홈&리빙',
    '뷰티',
    '헬스&푸드',
    '라이프',
    '패션',
    '홈&리빙',
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;

    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;

    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;

    onSelect();
    setScrollSnaps(carouselAPI.scrollSnapList());
    carouselAPI.on('select', onSelect);
  }, [carouselAPI, onSelect]);

  return (
    <>
      {/* 모바일에서 보일 컴포넌트 */}
      <div className="block md:hidden">
        <div className="scrollbar-hide mb-4 flex space-x-4 overflow-x-auto whitespace-nowrap">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`cursor-pointer rounded px-4 py-2 transition-all ${selectedIndex === index ? 'bg-black text-white hover:bg-black' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <Carousel className="mx-auto w-full" setApi={setCarouselAPI}>
          <CarouselContent className="-ml-4">
            {categories.map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-4">
                  {new Array(5).fill(0).map((_, rankIndex) => (
                    <RankCampaignCard ranking={rankIndex + 1} key={rankIndex} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 모바일 이상 사이즈에서 보일 컴포넌트 */}
      {/* 추후 데이터 요청 부분이 추가되면 윈도우 사이즈별로 데이터 요청을 다르게 해야할듯 */}
      <div className="hidden md:flex">
        <div>
          <ul className="flex flex-col items-center gap-4">
            {new Array(3).fill(0).map((_, index) => (
              <li key={index}>
                <RankCampaignCard ranking={index + 1} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col items-center gap-4">
            {new Array(3).fill(0).map((_, index) => (
              <li key={index}>
                <RankCampaignCard ranking={index + 1} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden lg:block">
          <ul className="flex flex-col items-center gap-4">
            {new Array(3).fill(0).map((_, index) => (
              <li key={index}>
                <RankCampaignCard ranking={index + 1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
