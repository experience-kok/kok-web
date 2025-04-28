interface Menu {
  title: string;
  url: string;
}

// 메뉴 데이터 매핑
export const routeMenu: Menu[] = [
  {
    title: '홈',
    url: '/',
  },
  {
    title: '내 정보',
    url: '/mypage',
  },
];

// 서브 메뉴 목록
export const subMenu: Menu[] = [
  { title: '홈', url: '/' },
  { title: '메디힐', url: '/mediheal' },
  { title: '오특', url: '/special' },
  { title: '랭킹', url: '/ranking' },
  { title: '매거진', url: '/magazine' },
  { title: 'LUXE EDIT', url: '/luxe-edit' },
  { title: '기획전', url: '/planning' },
  { title: '이벤트', url: '/event' },
  { title: 'LUXE EDIT', url: '/luxe-edit' },
  { title: '기획전', url: '/planning' },
  { title: '이벤트', url: '/event' },
];
