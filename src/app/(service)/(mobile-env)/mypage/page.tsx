import { ChevronRight } from 'lucide-react';

import SplitBox from 'components/ui/split-box';
import { Text } from 'components/ui/text';

import MyCampaign from './_components/my-campaign';
import MyProfileWithFallback from './_components/my-profile/my-profile-with-fallback';
import Sns from './_components/sns';

/**
 * 내 정보 페이지
 */
export default function MyPage() {
  return (
    <>
      <MyProfileWithFallback />

      <SplitBox className="h-2" />

      <MyCampaign />

      <SplitBox className="h-2" />

      <Sns />

      <SplitBox className="h-2" />

      <section>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            공지사항
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            고객센터
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
        <div className="flex w-full items-center justify-between px-6 py-5">
          <Text size={'xl'} weight={'bold'}>
            알림센터
          </Text>
          <ChevronRight width={24} height={24} />
        </div>
      </section>
    </>
  );
}
