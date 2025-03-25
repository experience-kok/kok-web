import RankCampaignCard from './rank-campaign-card';

/**
 * 메인 페이지 카테고리 랭킹 섹션 컴포넌트
 */
export default function CategoryRankSection() {
  return (
    <div className="flex flex-col gap-4">
      {new Array(5).fill(0).map((_, index) => (
        <RankCampaignCard ranking={index + 1} key={index} />
      ))}
    </div>
  );
}
