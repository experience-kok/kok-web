'use client';

import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

import MyCampaign from './_components/my-campaign';
import MyProfileWithFallback from './_components/my-profile/my-profile-with-fallback';

/**
 * 마이페이지
 */
export default function MyPage() {
  return (
    <>
      <MyProfileWithFallback />

      <SplitBox className="h-2" />

      <MyCampaign />

      <SplitBox className="h-2" />

      <section className="px-6 py-10">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          등록된 SNS
        </Text>
      </section>
    </>
  );
}
