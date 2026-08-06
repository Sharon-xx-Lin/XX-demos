import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { genHeatData, themeBars } from './data';

const lightScale = ['#EDEFF2', '#D6EDE0', '#A8DCC2', '#6BC49B', '#2E7D5B'];
const darkScale = ['#262A30', '#224534', '#2F6349', '#3F8A63', '#5FCF9E'];

function useDark() {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  React.useEffect(() => {
    const ob = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')));
    ob.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => ob.disconnect();
  }, []);
  return dark;
}

export function DataPage({ empty = false, onGo }: { empty?: boolean; onGo?: () => void }) {
  const dark = useDark();
  const scale = dark ? darkScale : lightScale;
  const data = genHeatData(empty);
  const [detail, setDetail] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* 大数字 */}
        <div className="mt-6 flex items-baseline gap-1">
          <span
            className={`text-[52px] font-bold leading-none tabular-nums tracking-tight ${
              empty ? 'text-[#8B949E] dark:text-[#6B747E]' : ''
            }`}
          >
            {empty ? 0 : 13}
          </span>
          <span className={`text-[20px] font-medium ${empty ? 'text-[#8B949E] dark:text-[#6B747E]' : ''}`}>天</span>
        </div>
        <p className="mt-2 text-[16px] text-muted-foreground tabular-nums">
          {empty ? '完成第一次后这里会有记录' : '累计 47 次 · 6 小时 03 分'}
        </p>

        {/* 热力图 无图例 */}
        <div className="mt-8 grid grid-cols-14 gap-1.5" style={{ gridTemplateColumns: 'repeat(14, 1fr)' }}>
          {data.map((v, i) => (
            <button
              key={i}
              onClick={() => !empty && setDetail(i)}
              className="aspect-square rounded-[3px]"
              style={{ backgroundColor: scale[v] }}
            />
          ))}
        </div>

        {!empty && detail !== null && (
          <p className="mt-3 text-[13px] text-muted-foreground tabular-nums">
            这天学了 {[0, '不到 5 分钟', '9 分钟', '23 分钟', '38 分钟'][data[detail]] || '未学习'}
          </p>
        )}

        {/* 去补卡 右对齐 */}
        <div className="mt-6 flex justify-end">
          {empty ? (
            <button
              onClick={onGo}
              className="text-[16px] font-semibold text-primary min-h-[44px] px-4"
            >
              去学一条
            </button>
          ) : (
            <button className="border border-border rounded-[10px] px-5 py-2.5 text-[15px] font-semibold text-primary min-h-[44px]">
              去补卡
            </button>
          )}
        </div>

        {!empty && (
          <>
            <div className="mt-8 border-t border-border" />
            <p className="mt-8 text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">主题</p>
            <div className="mt-6 space-y-6">
              {themeBars.map((t) => (
                <div key={t.name} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 text-[16px]">{t.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#6BC49B] dark:bg-[#3F8A63]"
                      style={{ width: `${(t.n / t.max) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-[16px] text-muted-foreground tabular-nums">{t.n}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
