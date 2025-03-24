import Link from 'next/link';

type Menu = {
  title: string;
  url: string;
};

const NAV_MENU: Menu[] = [
  {
    title: '제품',
    url: '/',
  },
  {
    title: '지역',
    url: '/',
  },
  {
    title: 'AA',
    url: '/',
  },
  {
    title: 'BB',
    url: '/',
  },
];

/**
 * 헤더 네비게이션 컴포넌트
 */
export default function HeaderNav() {
  return (
    <nav className="ml-16">
      <ul className="hidden items-center md:flex">
        {NAV_MENU.map((menu, index) => (
          <li className="flex items-center" key={menu.title}>
            <Link href={menu.url} className="hover:text-primary text-xl font-semibold">
              {menu.title}
            </Link>

            {/* 구분선 */}
            {index < NAV_MENU.length - 1 && (
              <div className="mx-4 h-2 border-r border-gray-200"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
