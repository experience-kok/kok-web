'use client';

import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

import MyCampaign from './_components/my-campaign';
import MyProfile from './_components/my-profile';

/**
 * 마이페이지
 */
export default function MyPage() {
  return (
    <>
      <MyProfile />

      <SplitBox className="h-2" />

      <MyCampaign />

      <SplitBox className="h-2" />

      <section className="px-8 py-10">
        <Text as="h2" size="2xl" weight="bold" className="mb-4">
          등록된 SNS
        </Text>
      </section>
    </>
  );
}
