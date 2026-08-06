import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { report } from './data';
import { IconClose, IconArrowRight, IconChevronDown, IconCheck } from './icons';

export function ReportPage({ onExit, onAgain }: { onExit: () => void; onAgain: () => void }) {
  const [saved, setSaved] = useState(report.saved.map((s) => s.checked));
  const [open, setOpen] = useState(false);

  const toggle = (i: number) => setSaved((s) => s.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={onExit} className="w-11 h-11 flex items-center justify-center -ml-2 text-muted-foreground">
          <IconClose className="w-6 h-6" />
        </button>
        <button className="text-[16px] text-muted-foreground min-h-[44px] px-2">分享</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        {/* 时长大数字 单焦点 */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-[52px] font-bold leading-none tabular-nums tracking-tight">{report.minutes}</span>
          <span className="text-[20px] font-medium">分钟</span>
        </div>
        <p className="mt-2 text-[16px] text-muted-foreground tabular-nums">
          今天第 {report.todayCount} 次 · 累计 {report.total} 次
        </p>

        {/* 素材行 */}
        <div className="mt-8 flex items-center gap-3">
          <div className="w-16 h-11 rounded-[10px] bg-muted shrink-0 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/34924856/pexels-photo-34924856.jpeg?auto=compress&cs=tinysrgb&h=200&w=300"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[16px] font-medium leading-tight truncate">{report.material.title}</p>
            <p className="mt-0.5 text-[13px] text-[#8B949E] dark:text-[#6B747E] tabular-nums">
              {report.material.source} · 看了 {report.material.progress}%
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border" />

        {/* 纠错项 无标题 */}
        {report.corrections.map((c, i) => (
          <div key={i}>
            <div className="mt-8">
              <p className="text-[16px] text-[#8B949E] dark:text-[#6B747E] line-through decoration-[#C7CDD4]">{c.said}</p>
              <p className="mt-2 flex items-start gap-2 text-[18px] font-medium leading-snug">
                <IconArrowRight className="w-5 h-5 mt-1 text-[#2C6FA8] dark:text-[#7DB8E8] shrink-0" />
                <span>{c.better}</span>
              </p>
              <p className="mt-2 text-[16px] text-muted-foreground leading-relaxed">{c.note}</p>
            </div>
            <div className="mt-8 border-t border-border" />
          </div>
        ))}

        {/* 收藏表达 */}
        <div className="mt-8">
          <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">收藏表达</p>
          <div className="mt-4 space-y-4">
            {report.saved.map((s, i) => (
              <button key={i} onClick={() => toggle(i)} className="flex items-start gap-3 w-full text-left min-h-[44px]">
                <span
                  className={`shrink-0 w-6 h-6 rounded-[6px] flex items-center justify-center mt-0.5 transition-colors ${
                    saved[i] ? 'bg-primary text-primary-foreground' : 'border-2 border-[#C7CDD4] dark:border-[#3A414A]'
                  }`}
                >
                  {saved[i] && <IconCheck className="w-4 h-4" strokeWidth={2.4} />}
                </span>
                <span>
                  <span className="block text-[17px] font-medium leading-snug">{s.en}</span>
                  <span className="block mt-0.5 text-[15px] text-muted-foreground">{s.zh}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border" />

        {/* 对话记录折叠 */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-6 flex items-center justify-between w-full min-h-[44px]"
        >
          <span className="text-[16px] font-medium">对话记录</span>
          <IconChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="mt-4 space-y-4 pb-2">
            {report.transcript.map((t, i) => (
              <div key={i}>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">
                  {t.who === 'ai' ? 'AI' : '你'}
                </p>
                <p className="mt-1 text-[16px] leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          onClick={onAgain}
          className="w-full bg-primary text-primary-foreground text-[16px] font-semibold rounded-[10px] py-3.5 active:scale-[.98] transition-transform"
        >
          再学一条
        </button>
        <div className="text-center mt-4">
          <button onClick={onExit} className="text-[14px] text-muted-foreground underline underline-offset-4 min-h-[44px] px-4">
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
