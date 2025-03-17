import { Text } from 'components/ui/text';

import BrandSection from './_components/brand-section';
import MainBanner from './_components/main-banner';

export default function Home() {
  return (
    <>
      <section className="px-16 py-10">
        <MainBanner />
      </section>

      <section className="px-16 py-10">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          브랜드관
        </Text>
        <BrandSection />
      </section>
    </>
  );
}
