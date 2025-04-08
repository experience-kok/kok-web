/**
 * 레이아웃 잡을 때 사용되는 패딩 래퍼
 * @param children 래핑할 자식 컴포넌트
 */
export default function PaddingWrapper({ children }: React.PropsWithChildren) {
  return <div className="h-full w-full px-4 lg:px-16">{children}</div>;
}
