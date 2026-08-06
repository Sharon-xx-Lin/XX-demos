import React, { useState } from 'react';
import { Onboarding } from './Onboarding';
import { HomePage } from './HomePage';
import { ConsumePage } from './ConsumePage';
import { ChatPage } from './ChatPage';
import { ReportPage } from './ReportPage';
import { DataPage } from './DataPage';
import { CommunityPage } from './CommunityPage';
import { MinePage } from './MinePage';
import { TabBar, Tab } from './TabBar';
import { featured, Material } from './data';

type View = 'onboarding' | 'main' | 'consume' | 'chat' | 'report';

const scenes = [
  { key: 'ob', label: 'Onboarding' },
  { key: 'first', label: '首次首页' },
  { key: 'normal', label: '常规' },
  { key: 'empty-data', label: '空·数据' },
] as const;
type Scene = (typeof scenes)[number]['key'];

function App() {
  const [scene, setScene] = useState<Scene>('ob');
  const [view, setView] = useState<View>('onboarding');
  const [tab, setTab] = useState<Tab>('home');
  const [firstTime, setFirstTime] = useState(true);
  const [firstSession, setFirstSession] = useState(true);
  const [current, setCurrent] = useState<Material>(featured);
  const [swOpen, setSwOpen] = useState(false);

  const applyScene = (s: Scene) => {
    setScene(s);
    setSwOpen(false);
    if (s === 'ob') {
      setView('onboarding');
      setFirstTime(true);
      setFirstSession(true);
    } else if (s === 'first') {
      setView('main');
      setTab('home');
      setFirstTime(true);
    } else if (s === 'normal') {
      setView('main');
      setTab('home');
      setFirstTime(false);
    } else if (s === 'empty-data') {
      setView('main');
      setTab('data');
      setFirstTime(false);
    }
  };

  const openMaterial = (m: Material) => {
    setCurrent(m);
    setView('consume');
  };

  const showTab = view === 'main';
  const emptyData = scene === 'empty-data';

  return (
    <div className="relative w-full h-screen bg-background flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {view === 'onboarding' && (
            <Onboarding
              onDone={() => {
                setView('main');
                setTab('home');
                setScene('first');
              }}
            />
          )}

          {view === 'main' && tab === 'home' && (
            <HomePage firstTime={firstTime} onOpen={openMaterial} />
          )}
          {view === 'main' && tab === 'data' && <DataPage empty={emptyData} onGo={() => { setTab('home'); }} />}
          {view === 'main' && tab === 'community' && <CommunityPage onOpen={() => openMaterial(featured)} />}
          {view === 'main' && tab === 'mine' && <MinePage />}

          {view === 'consume' && (
            <ConsumePage
              m={current}
              onBack={() => setView('main')}
              onNext={() => setView('chat')}
            />
          )}
          {view === 'chat' && (
            <ChatPage
              firstSession={firstSession}
              onClose={() => setView('main')}
              onFinish={() => {
                setFirstSession(false);
                setView('report');
              }}
            />
          )}
          {view === 'report' && (
            <ReportPage
              onExit={() => {
                setFirstTime(false);
                setScene('normal');
                setView('main');
                setTab('home');
              }}
              onAgain={() => {
                setFirstTime(false);
                setScene('normal');
                setView('main');
                setTab('home');
              }}
            />
          )}
        </div>

        {showTab && <TabBar active={tab} onChange={setTab} />}

        {/* State Switcher —— 用于查看无法通过产品内交互到达的环境态（首次/空态） */}
        <div className="absolute right-3 top-14 z-50">
          <button
            onClick={() => setSwOpen((o) => !o)}
            className="w-9 h-9 rounded-full bg-foreground/85 text-background text-[11px] font-bold flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,.2)]"
          >
            视图
          </button>
          {swOpen && (
            <div className="mt-2 w-36 rounded-[10px] bg-popover text-popover-foreground border border-border shadow-[0_4px_16px_rgba(0,0,0,.12)] overflow-hidden">
              {scenes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => applyScene(s.key)}
                  className={`block w-full text-left px-3 py-2.5 text-[14px] ${
                    scene === s.key ? 'bg-accent text-accent-foreground font-semibold' : ''
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
