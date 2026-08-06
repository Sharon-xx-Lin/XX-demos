import React from 'react';
import { IconSignal, IconWifi, IconBattery } from './icons';

export function StatusBar({ time = '9:41', dark = false }: { time?: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-6 pt-3 pb-1 select-none ${
        dark ? 'text-white' : 'text-foreground'
      }`}
    >
      <span className="text-[15px] font-semibold tracking-tight tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        <IconSignal className="w-[17px] h-[17px]" />
        <IconWifi className="w-[17px] h-[17px]" />
        <IconBattery className="w-[26px] h-[26px]" />
      </div>
    </div>
  );
}
