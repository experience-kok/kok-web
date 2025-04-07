import { Badge } from 'components/ui/badge';

const BADGE_TYPE = {
  // 유튜브
  YOUTUBE: {
    label: '유튜브',
    style: 'bg-red-100 text-red-500',
  },
  // 네이버 블로그
  NAVER_BLOG: {
    label: '네이버 블로그',
    style: 'bg-green-100 text-green-500',
  },
  // 인스타그램
  INSTAGRAM: {
    label: '인스타그램',
    style: 'bg-pink-100 text-pink-500',
  },
  // 기타
  OTHER: {
    label: '기타',
    style: 'bg-gray-100',
  },
} as const;

type BadgeTypeKey = keyof typeof BADGE_TYPE;

interface Props {
  campaignType: BadgeTypeKey;
}

/**
 * 캠페인 타입별 뱃지 컴포넌트
 */
export default function CampaignTypeBadge({ campaignType }: Props) {
  const { label, style } = BADGE_TYPE[campaignType];

  return (
    <Badge className={`hover:none font-semibold ${style}`} variant="secondary">
      {label}
    </Badge>
  );
}
