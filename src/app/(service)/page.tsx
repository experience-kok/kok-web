'use client';

import BrandSection from 'app/_components/brand-section';
import CategoryRankSection from 'app/_components/category-rank-section';
import MainBanner from 'app/_components/main-banner';
import PopularSection from 'app/_components/popular-section';
import LottieLoader from 'components/shared/lottie-loader';
import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

import LoadingLottie from 'public/lotties/loading.json';

export default function Home() {
  return (
    <>
      <LottieLoader animationData={LoadingLottie} className="h-48 w-48" />
      <section className="md:px-4 md:py-10 lg:px-16">
        <MainBanner />
      </section>

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          인기 캠페인
        </Text>
        <PopularSection />
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          카테고리 랭킹
        </Text>
        <CategoryRankSection />
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          브랜드관
        </Text>
        <BrandSection />
      </section>

      <SplitBox className="h-2" />

      <section className="px-4 py-10 lg:px-16">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          임시 영역
        </Text>
        <BrandSection />
      </section>
    </>
  );
}
