'use client';

import React from 'react';

import { House, AlarmClock, Menu, UserRound, Pin } from 'lucide-react';

import { useScrollDirection } from 'hooks/use-scroll-direction';

import MenuItem from './menu-item';

/**
 * 모바일 전용 하단 메뉴
 */
export default function FooterMenu() {
  const scrollDirection = useScrollDirection();

  const menus: {
    icon: React.ReactNode;
    title: string;
  }[] = [
    {
      icon: <Menu className="h-6 w-6" />,
      title: '카테고리',
    },
    {
      icon: <AlarmClock className="h-6 w-6" />,
      title: '마감임박',
    },
    {
      icon: <House className="h-6 w-6" />,
      title: '홈',
    },
    {
      icon: <Pin className="h-6 w-6" />,
      title: '콕',
    },
    {
      icon: <UserRound className="h-6 w-6" />,
      title: '마이',
    },
  ];

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 h-14 w-full bg-white transition-transform duration-300 md:hidden ${
        scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <ul className="flex h-full items-center justify-around">
        {menus.map((menu, index) => (
          <MenuItem icon={menu.icon} title={menu.title} key={menu.title + index} />
        ))}
      </ul>
    </div>
  );
}
