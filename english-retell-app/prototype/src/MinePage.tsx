import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { IconChevronRight } from './icons';

const IMG_AVATAR =
  'https://images.pexels.com/photos/4218027/pexels-photo-4218027.jpeg?auto=compress&cs=tinysrgb&h=200&w=200';

function Row({ label, value, onClick, last }: { label: string; value?: string; onClick?: () => void; last?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full py-4 min-h-[44px] ${last ? '' : 'border-b border-border'}`}
    >
      <span className="text-[17px] text-foreground">{label}</span>
      <span className="ml-auto flex items-center gap-2">
        {value && <span className="text-[16px] text-muted-foreground tabular-nums">{value}</span>}
        <IconChevronRight className="w-4 h-4 text-[#C7CDD4] dark:text-[#4A515A]" />
      </span>
    </button>
  );
}

export function MinePage() {
  const [reportEmpty, setReportEmpty] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* 头像 + 水平标签 */}
        <div className="mt-6 flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-muted overflow-hidden shrink-0">
            <img src={IMG_AVATAR} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[24px] font-bold tracking-tight">林小雪</p>
            <p className="mt-0.5 text-[16px] text-muted-foreground">B1</p>
          </div>
        </div>

        {/* 主内容组 */}
        <div className="mt-8">
          <Row label="学习报告" value={reportEmpty ? '0' : '47'} onClick={() => setReportEmpty((e) => !e)} />
          <Row label="词表" value="61" />
          <Row label="订阅主题" value="2" last />
        </div>

        {reportEmpty && (
          <div className="mt-4">
            <p className="text-[16px] text-muted-foreground">还没有报告</p>
            <p className="mt-1 text-[15px] text-[#8B949E] dark:text-[#6B747E]">每次复述后会自动生成</p>
          </div>
        )}

        {/* 偏好 */}
        <p className="mt-10 text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">偏好</p>
        <div className="mt-2">
          <Row label="解释语言" value="中文" />
          <Row label="每日提醒" value="关" />
          <Row label="字号" value="标准" last />
        </div>

        {/* 隐私 */}
        <p className="mt-10 text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">隐私</p>
        <div className="mt-2">
          <Row label="录音" value="不留存" />
          <Row label="改进模型" value="关" />
          <Row label="删除学习记录" last />
        </div>
      </div>
    </div>
  );
}
