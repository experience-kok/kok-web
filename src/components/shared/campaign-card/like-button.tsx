import { Heart } from 'lucide-react';

/**
 * 카드컴포넌트에서 사용할 좋아요(찜) 버튼 컴포넌트
 */
export default function LikeButton() {
  return (
    <>
      <Heart className="hover:text-primary h-6 w-6 cursor-pointer transition-all ease-in-out" />
    </>
  );
}
