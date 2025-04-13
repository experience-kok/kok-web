import { Text } from 'components/ui/text';

/**
 * 마이페이지 내 켐페인 영역 컴포넌트
 */
export default function MyCampaign() {
  return (
    <section className="px-4 py-10 lg:px-16">
      <Text as="h2" size="2xl" weight="bold" className="mb-4">
        내 캠페인
      </Text>
      <div className="grid grid-cols-4 divide-x">
        {new Array(4).fill(0).map((_, index) => (
          <div className="flex flex-col items-center gap-1" key={index}>
            <Text size="2xl" weight="bold" color="primary">
              0
            </Text>
            <Text size="lg" weight="semibold">
              지원
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
