import CampaignCard from 'components/shared/campaign-card';

/**
 * 메인 페이지 인기 캠페인 섹션 컴포넌트
 */
export default function PopularSection() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  );
}
