'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 헤더 하단 네비게이션 컴포넌트
 */
export default function HeaderSecondNav() {
  const path = usePathname();
  const menus = [
    { title: '홈', url: '/' },
    { title: '메디힐', url: '/mediheal' },
    { title: '오특', url: '/special' },
    { title: '랭킹', url: '/ranking' },
    { title: '매거진', url: '/magazine' },
    { title: 'LUXE EDIT', url: '/luxe-edit' },
    { title: '기획전', url: '/planning' },
    { title: '이벤트', url: '/event' },
    { title: '메디힐', url: '/mediheal' },
    { title: '오특', url: '/special' },
    { title: '랭킹', url: '/ranking' },
    { title: '매거진', url: '/magazine' },
    { title: 'LUXE EDIT', url: '/luxe-edit' },
    { title: '기획전', url: '/planning' },
    { title: '이벤트', url: '/event' },
  ];

  return (
    <div className="h-11 w-full px-4 lg:px-16">
      <ul className="scrollbar-hide flex h-full space-x-4 overflow-x-auto whitespace-nowrap">
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`flex items-center justify-center ${
              path === menu.url ? 'font-bold' : 'text-muted-foreground'
            }`}
          >
            <Link
              href={menu.url}
              className={`border-b-2 ${
                path === menu.url ? 'border-foreground' : 'border-transparent'
              }`}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
