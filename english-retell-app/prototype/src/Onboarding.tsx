import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { interests } from './data';

const levels = [
  '能读懂简单句子，听和说都吃力',
  '能看懂大部分内容，但说不出来',
  '想挑战原速、真实语境的内容',
];

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(1);
  const [picked, setPicked] = useState<Set<string>>(new Set(['AI 与科技', '商业财经', '职场与沟通']));

  const toggle = (t: string) => {
    setPicked((p) => {
      const n = new Set(p);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <StatusBar />
      <div className="flex justify-end px-6 pt-2">
        <button onClick={onDone} className="text-[15px] text-[#8B949E] dark:text-[#6B747E] min-h-[44px] px-2">
          跳过
        </button>
      </div>

      {step === 0 ? (
        <div className="flex-1 flex flex-col px-6">
          <h1 className="mt-6 text-[28px] leading-[1.25] font-bold tracking-tight">
            你现在的英语，哪句更像？
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">用来挑难度，之后随时能改</p>
          <div className="mt-10">
            {levels.map((l, i) => {
              const on = level === i;
              return (
                <button
                  key={i}
                  onClick={() => setLevel(i)}
                  className="w-full flex items-center gap-4 py-4 border-b border-border text-left min-h-[44px]"
                >
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      on ? 'border-primary' : 'border-[#C7CDD4] dark:border-[#3A414A]'
                    }`}
                  >
                    {on && <span className="w-3 h-3 rounded-full bg-primary" />}
                  </span>
                  <span className={`text-[17px] ${on ? 'text-foreground font-medium' : 'text-foreground'}`}>{l}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-6 overflow-y-auto">
          <h1 className="mt-6 text-[28px] leading-[1.25] font-bold tracking-tight">想听点什么？</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">选几个都行</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {interests.map((t) => {
              const on = picked.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`px-4 py-2.5 rounded-[10px] text-[16px] transition-colors min-h-[44px] ${
                    on
                      ? 'bg-accent text-accent-foreground font-semibold'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-6 pb-6 pt-4">
        <button
          onClick={() => (step === 0 ? setStep(1) : onDone())}
          className="w-full bg-primary text-primary-foreground text-[16px] font-semibold rounded-[10px] py-3.5 active:scale-[.98] transition-transform"
        >
          {step === 0 ? '继续' : '开始'}
        </button>
        <div className="flex justify-center gap-2 mt-5">
          <span className={`h-1.5 rounded-full transition-all ${step === 0 ? 'w-5 bg-primary' : 'w-1.5 bg-muted'}`} />
          <span className={`h-1.5 rounded-full transition-all ${step === 1 ? 'w-5 bg-primary' : 'w-1.5 bg-muted'}`} />
        </div>
      </div>
    </div>
  );
}
