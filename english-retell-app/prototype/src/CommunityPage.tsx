import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { community } from './data';
import { IconPlus } from './icons';

export function CommunityPage({ onOpen }: { onOpen: (id: string) => void }) {
  const [empty, setEmpty] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background text-foreground relative">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <h1 className="mt-4 text-[28px] font-bold tracking-tight">发现</h1>

        {empty ? (
          <div className="mt-16 text-center">
            <p className="text-[18px] text-muted-foreground">还没有人推荐</p>
            <button
              onClick={() => setEmpty(false)}
              className="mt-5 border border-border rounded-[10px] px-5 py-3 text-[15px] font-semibold min-h-[44px]"
            >
              推荐一条
            </button>
          </div>
        ) : (
          <div className="mt-6">
            {community.map((c, i) => (
              <div key={c.m.id}>
                <button onClick={() => onOpen(c.m.id)} className="w-full text-left active:opacity-80">
                  <div className="flex gap-4">
                    <div className="relative w-[128px] shrink-0 aspect-video rounded-[10px] overflow-hidden bg-muted">
                      <img src={c.m.cover} alt="" className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute bottom-2 right-2 bg-black/65 text-white text-[12px] font-medium px-1.5 py-0.5 rounded-[6px] tabular-nums">
                        {c.m.duration}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[20px] font-bold leading-[1.25] tracking-tight">{c.m.title}</h3>
                      <p className="mt-2 text-[13px] text-[#8B949E] dark:text-[#6B747E]">{c.by}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[16px] leading-relaxed">{c.note}</p>
                </button>
                {i < community.length - 1 && <div className="my-6 border-t border-border" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 右下浮动 + */}
      <button className="absolute right-6 bottom-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,.12)] active:scale-95 transition-transform">
        <IconPlus className="w-7 h-7" strokeWidth={2} />
      </button>
    </div>
  );
}
