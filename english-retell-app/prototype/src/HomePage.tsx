import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { todayList, featured, firstOther, Material } from './data';
import { IconReturnArrow, IconRefresh, IconSearch, IconArrowRight, IconClose } from './icons';

function Cover({ m, corner }: { m: Material; corner?: string }) {
  return (
    <div className="relative w-full aspect-video rounded-[10px] overflow-hidden bg-muted">
      <img src={m.cover} alt="" className="w-full h-full object-cover" loading="lazy" />
      {corner && (
        <span className="absolute top-3 left-3 bg-background/95 text-foreground text-[12px] font-semibold px-2.5 py-1 rounded-[6px]">
          {corner}
        </span>
      )}
      <span className="absolute bottom-3 right-3 bg-black/65 text-white text-[13px] font-medium px-2 py-0.5 rounded-[6px] tabular-nums">
        {m.duration}
      </span>
    </div>
  );
}

function MaterialBlock({ m, corner, onOpen }: { m: Material; corner?: string; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="block w-full text-left active:opacity-80 transition-opacity">
      <Cover m={m} corner={corner} />
      <h3 className="mt-3 text-[22px] font-bold leading-[1.3] tracking-tight">{m.title}</h3>
      {m.zh && <p className="mt-2 text-[16px] text-muted-foreground leading-relaxed">{m.zh}</p>}
      <p className="mt-2 text-[13px] text-[#8B949E] dark:text-[#6B747E]">
        {m.level}
        {m.speed ? ` · ${m.speed}` : ''} · {m.source}
      </p>
    </button>
  );
}

export function HomePage({
  firstTime,
  onOpen,
}: {
  firstTime: boolean;
  onOpen: (m: Material) => void;
}) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState<string | null>(null);
  const [batch, setBatch] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    setSearched(q);
  };

  // 未命中主题（示例：任意非预置词都判为未命中，展示空态）
  const noHit = searched && !['ai', '科技', 'kpop', '商业', '职场'].some((k) => searched.toLowerCase().includes(k));

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* 搜索框 */}
        <div className="mt-4 relative">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B949E] dark:text-[#6B747E]" />
          <input
            value={query}
            maxLength={30}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doSearch()}
            placeholder="想学什么主题"
            className="w-full bg-secondary rounded-[10px] pl-11 pr-4 py-3 text-[16px] placeholder:text-[#8B949E] dark:placeholder:text-[#6B747E] outline-none focus:ring-1 focus:ring-ring"
          />
          {searched && (
            <button
              onClick={() => {
                setSearched(null);
                setQuery('');
                setSubscribed(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#8B949E]"
            >
              <IconClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 搜索未命中空态 */}
        {noHit ? (
          <div className="mt-10">
            <p className="text-[22px] font-bold tracking-tight">还没有「{searched}」的素材</p>
            {!subscribed ? (
              <button
                onClick={() => setSubscribed(true)}
                className="mt-5 inline-flex items-center gap-2 border border-border rounded-[10px] px-5 py-3 text-[15px] font-semibold min-h-[44px]"
              >
                订阅这个主题
              </button>
            ) : (
              <p className="mt-5 text-[15px] text-muted-foreground">有了就通知你</p>
            )}

            <div className="mt-12">
              <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">试试这些</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {['AI 与科技', '商业财经', '职场与沟通', '科普'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSearched(null);
                      setQuery('');
                    }}
                    className="px-4 py-2.5 rounded-[10px] bg-secondary text-[16px] min-h-[44px]"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : firstTime ? (
          <>
            <h1 className="mt-6 text-[28px] font-bold leading-[1.25] tracking-tight">从这条开始</h1>
            <p className="mt-2 text-[16px] text-muted-foreground">两分半，说一句就算完成</p>
            <div className="mt-6">
              <MaterialBlock m={featured} corner="3 分钟" onOpen={() => onOpen(featured)} />
            </div>
            <div className="my-8 border-t border-border" />
            <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">也可以看这些</p>
            <div className="mt-4">
              <MaterialBlock m={firstOther} onOpen={() => onOpen(firstOther)} />
            </div>
          </>
        ) : (
          <>
            {/* 打卡单焦点 */}
            <div className="mt-6">
              <div className="flex items-baseline gap-1">
                <span className="text-[52px] font-bold leading-none tabular-nums tracking-tight">13</span>
                <span className="text-[20px] font-medium text-foreground">天</span>
              </div>
              <p className="mt-2 text-[16px] text-muted-foreground tabular-nums">累计 47 次</p>
              <div className="mt-4 flex gap-1.5">
                {[1, 1, 1, 1, 0, 0, 0].map((v, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${v ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>

            {/* 续接 */}
            <button
              onClick={() => onOpen(featured)}
              className="mt-8 flex items-center gap-3 text-left w-full min-h-[44px]"
            >
              <IconReturnArrow className="w-5 h-5 text-primary shrink-0" />
              <span className="text-[16px] font-medium">AI 芯片竞赛</span>
              <span className="text-[16px] text-[#8B949E] dark:text-[#6B747E] tabular-nums">· 4:12</span>
            </button>

            <div className="mt-8 border-t border-border" />

            {/* 今日推荐 */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">今日推荐</p>
              <button
                onClick={() => setBatch((b) => b + 1)}
                disabled={batch >= 3}
                className="flex items-center gap-1.5 text-[13px] text-muted-foreground disabled:opacity-40 min-h-[44px]"
              >
                <IconRefresh className="w-4 h-4" />
                换一批
              </button>
            </div>

            <div className="mt-4 space-y-8">
              {todayList.map((m, i) => (
                <MaterialBlock key={m.id + batch} m={m} corner={m.short ? '3 分钟' : undefined} onOpen={() => onOpen(m)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
