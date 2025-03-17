import BrandCard from '../brand-section/brand-card';

/**
 * 메인 페이지 인기 캠페인 섹션 컴포넌트
 */
export default function PopularSection() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BrandCard />
      <BrandCard />
      <BrandCard />
      <BrandCard />
    </div>
  );
}
