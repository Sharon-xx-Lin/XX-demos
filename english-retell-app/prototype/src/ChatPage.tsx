import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { chatTurns } from './data';
import { IconClose, IconKeyboard, IconMic, IconHint } from './icons';

const bars = [0.5, 0.85, 0.35, 1, 0.55, 0.9, 0.45, 0.7, 0.4];

function Wave({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-[#6B4FA8] dark:bg-[#B49CE8]"
          style={{
            height: `${h * 100}%`,
            animation: active ? `wave 1s ease-in-out ${i * 0.08}s infinite` : 'none',
            opacity: active ? 1 : 0.5,
          }}
        />
      ))}
    </div>
  );
}

export function ChatPage({
  firstSession,
  onClose,
  onFinish,
}: {
  firstSession: boolean;
  onClose: () => void;
  onFinish: () => void;
}) {
  const [turn, setTurn] = useState(0);
  const [micState, setMicState] = useState<'idle' | 'listening' | 'processing'>('idle');
  const [showZh, setShowZh] = useState(false);
  const [showHint, setShowHint] = useState(firstSession);

  const cur = chatTurns[Math.min(turn, chatTurns.length - 1)];

  const tapMic = () => {
    if (micState === 'idle') {
      setMicState('listening');
    } else if (micState === 'listening') {
      setMicState('processing');
      setTimeout(() => {
        setMicState('idle');
        setShowZh(false);
        setShowHint(false);
        setTurn((t) => Math.min(t + 1, chatTurns.length - 1));
      }, 900);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <style>{`@keyframes wave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}`}</style>
      <StatusBar />

      {/* 顶部弱视觉 */}
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={onClose} className="w-11 h-11 flex items-center justify-center -ml-2 text-muted-foreground">
          <IconClose className="w-6 h-6" />
        </button>
        <span className="text-[15px] text-[#8B949E] dark:text-[#6B747E] tabular-nums">
          {turn + 1} / 6
        </span>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6">
        {/* AI 当前话语 21px 大字 无气泡无头像 */}
        <p className="text-[21px] leading-[1.5] font-normal text-foreground">{cur.ai}</p>

        {/* 声波 */}
        <div className="mt-6">
          <Wave active={micState !== 'idle'} />
        </div>

        {/* 看中文 */}
        <button
          onClick={() => setShowZh((s) => !s)}
          className="mt-4 text-[14px] text-[#8B949E] dark:text-[#6B747E] self-start min-h-[36px]"
        >
          看中文
        </button>
        {showZh && <p className="text-[16px] text-muted-foreground leading-relaxed">{cur.zh}</p>}

        {/* 句头提示（仅首次默认展开） */}
        {showHint && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2.5">
              {["It's about…", 'It talks about…'].map((h) => (
                <span
                  key={h}
                  className="px-3.5 py-2 rounded-[10px] bg-[#F0EBFA] dark:bg-[#2C2542] text-[#6B4FA8] dark:text-[#B49CE8] text-[15px]"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 你说 降级灰字 */}
        {cur.you && (
          <div className="mt-10">
            <p className="text-[11px] font-bold tracking-[0.1em] text-[#8B949E] dark:text-[#6B747E]">你说</p>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#8B949E] dark:text-[#6B747E]">{cur.you}</p>
          </div>
        )}
      </div>

      {/* 三键 */}
      <div className="px-8 pb-3 pt-4">
        <div className="flex items-end justify-between">
          <button className="flex flex-col items-center gap-2 text-muted-foreground w-16">
            <IconKeyboard className="w-7 h-7" />
            <span className="text-[13px]">打字</span>
          </button>

          <div className="flex flex-col items-center">
            <button
              onClick={tapMic}
              className="w-[76px] h-[76px] rounded-full bg-[#6B4FA8] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,.15)] active:scale-95 transition-transform"
            >
              <IconMic className="w-8 h-8" strokeWidth={1.8} />
            </button>
            {firstSession && micState === 'idle' && (
              <span className="mt-2 text-[13px] text-[#8B949E] dark:text-[#6B747E]">按住说话</span>
            )}
            {micState === 'listening' && <span className="mt-2 text-[13px] text-[#6B4FA8] dark:text-[#B49CE8]">聆听中</span>}
            {micState === 'processing' && <span className="mt-2 text-[13px] text-[#8B949E]">处理中</span>}
          </div>

          <button
            onClick={() => setShowHint((s) => !s)}
            className="flex flex-col items-center gap-2 text-muted-foreground w-16"
          >
            <IconHint className="w-7 h-7" />
            <span className="text-[13px]">提示</span>
          </button>
        </div>

        <div className="text-center mt-5 pb-4">
          <button onClick={onFinish} className="text-[16px] text-muted-foreground min-h-[44px] px-6">
            结束
          </button>
        </div>
      </div>
    </div>
  );
}
