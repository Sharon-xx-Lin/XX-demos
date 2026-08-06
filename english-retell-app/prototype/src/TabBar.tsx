import React from 'react';
import { IconHome, IconCalendar, IconChat, IconUser } from './icons';

export type Tab = 'home' | 'data' | 'community' | 'mine';

const items: { key: Tab; label: string; Icon: typeof IconHome }[] = [
  { key: 'home', label: '首页', Icon: IconHome },
  { key: 'data', label: '数据', Icon: IconCalendar },
  { key: 'community', label: '社区', Icon: IconChat },
  { key: 'mine', label: '我的', Icon: IconUser },
];

export function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="border-t border-border bg-background">
      <div className="flex items-stretch px-2 pt-2 pb-6">
        {items.map(({ key, label, Icon }) => {
          const on = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex-1 flex flex-col items-center gap-1 py-1 min-h-[44px] transition-colors ${
                on ? 'text-primary' : 'text-[#8B949E] dark:text-[#6B747E]'
              }`}
            >
              <Icon className="w-[26px] h-[26px]" strokeWidth={on ? 2 : 1.7} />
              <span className={`text-[11px] ${on ? 'font-semibold' : 'font-normal'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
