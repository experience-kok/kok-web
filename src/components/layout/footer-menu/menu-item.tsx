import React from 'react';

import { Text } from 'components/ui/text';

interface Props {
  icon: React.ReactNode;
  title: string;
}

/**
 * 푸터 메뉴에 사용될 메뉴 아이템 컴포넌트
 */
export default function MenuItem({ icon, title }: Props) {
  return (
    <li className="flex flex-1 flex-col items-center text-center">
      {icon}
      <Text size="xs">{title}</Text>
    </li>
  );
}
