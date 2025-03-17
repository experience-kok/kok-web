import BrandCard from './brand-card';

/**
 * 메인 페이지 브랜드관 섹션 컴포넌트
 */
export default function BrandSection() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BrandCard />
      <BrandCard />
      <BrandCard />
      <BrandCard />
    </div>
  );
}
