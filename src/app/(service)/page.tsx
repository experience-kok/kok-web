import BrandSection from 'app/_components/brand-section';
import MainBanner from 'app/_components/main-banner';
import PopularSection from 'app/_components/popular-section';
import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

export default function Home() {
  return (
    <>
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
          브랜드관
        </Text>
        <BrandSection />
      </section>
    </>
  );
}
