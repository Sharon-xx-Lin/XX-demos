import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { Material, consumeSubtitles } from './data';
import { IconBack, IconPlay, IconCaption } from './icons';

const speeds = ['0.75', '1.0', '1.25', '1.5'];

export function ConsumePage({ m, onBack, onNext }: { m: Material; onBack: () => void; onNext: () => void }) {
  const [speed, setSpeed] = useState('1.0');
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center -ml-2">
          <IconBack className="w-6 h-6" />
        </button>
        <span className="text-[17px] font-medium text-muted-foreground">AI 与科技</span>
        <span className="w-11 h-11 flex items-center justify-center text-[17px] font-medium">Aa</span>
      </div>

      {/* 真实深色播放器 */}
      <div className="relative w-full aspect-video bg-[#0F0F10]">
        <img src={m.cover} alt="" className="w-full h-full object-cover opacity-45" />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 flex items-center justify-center"
        >
          {!playing && (
            <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,.2)]">
              <IconPlay className="w-7 h-7 text-[#0F0F10] ml-0.5" />
            </span>
          )}
        </button>
        <span className="absolute bottom-3 right-4 text-white text-[15px] font-bold tracking-tight">YouTube</span>
        {/* 红色进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/25">
          <div className="h-full bg-[#FF0000]" style={{ width: '43%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <h1 className="mt-6 text-[22px] font-bold leading-[1.3] tracking-tight">{m.title}</h1>
        <p className="mt-2 text-[15px] text-[#8B949E] dark:text-[#6B747E] tabular-nums">
          {m.duration} · {m.level} · {m.speed}
        </p>

        {/* 倍速文字按钮常驻 */}
        <div className="mt-6 flex items-center gap-5">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`text-[16px] tabular-nums min-h-[44px] ${
                speed === s ? 'font-bold text-foreground' : 'text-[#8B949E] dark:text-[#6B747E]'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-1.5 text-[15px] text-foreground">
            <IconCaption className="w-5 h-5" /> EN
          </span>
        </div>

        <div className="mt-4 border-t border-border" />

        {/* 字幕：当前句加粗变黑，无底色 */}
        <div className="mt-6 space-y-4">
          {consumeSubtitles.map((s, i) => (
            <p
              key={i}
              className={`text-[17px] leading-[1.7] ${
                s.cur ? 'font-semibold text-foreground' : 'text-[#8B949E] dark:text-[#6B747E]'
              }`}
            >
              {s.text}
            </p>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground text-[16px] font-semibold rounded-[10px] py-3.5 active:scale-[.98] transition-transform"
        >
          进入口语复述
        </button>
      </div>
    </div>
  );
}
