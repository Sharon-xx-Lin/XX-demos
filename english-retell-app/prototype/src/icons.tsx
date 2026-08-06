import React from 'react';

type P = React.SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  ...props,
});

export const IconHome = (p: P) => (
  <svg {...base(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></svg>
);
export const IconCalendar = (p: P) => (
  <svg {...base(p)}><rect x="3.5" y="4.5" width="17" height="16" rx="2.5" /><path d="M3.5 9h17M8 3v3M16 3v3" /></svg>
);
export const IconChat = (p: P) => (
  <svg {...base(p)}><path d="M4 5.5h16v11H9l-4 3.5v-3.5H4z" /></svg>
);
export const IconUser = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>
);
export const IconMic = (p: P) => (
  <svg {...base(p)}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" /></svg>
);
export const IconKeyboard = (p: P) => (
  <svg {...base(p)}><rect x="3" y="6.5" width="18" height="11" rx="2" /><path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8" /></svg>
);
export const IconHint = (p: P) => (
  <svg {...base(p)}><path d="M4 11a8 8 0 1 1 3 6.2" /><path d="M4 20v-4h4" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconBack = (p: P) => (
  <svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconChevronRight = (p: P) => (
  <svg {...base(p)}><path d="M9 5l7 7-7 7" /></svg>
);
export const IconChevronDown = (p: P) => (
  <svg {...base(p)}><path d="M5 9l7 7 7-7" /></svg>
);
export const IconPlay = (p: P) => (
  <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}><path d="M8 5.5v13l11-6.5z" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconRefresh = (p: P) => (
  <svg {...base(p)}><path d="M20 11a8 8 0 1 0-.5 4" /><path d="M20 5v6h-6" /></svg>
);
export const IconCaption = (p: P) => (
  <svg {...base(p)}><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M8 11.5h3M14 11.5h2.5" /></svg>
);
export const IconReturnArrow = (p: P) => (
  <svg {...base(p)}><path d="M9 7 4 12l5 5" /><path d="M4 12h11a5 5 0 0 1 5 5v0" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 6.5" /></svg>
);
export const IconSearch = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const IconBattery = (p: P) => (
  <svg {...base({ ...p, strokeWidth: 1.3 })}><rect x="2" y="7" width="18" height="10" rx="2.5" /><path d="M22 10.5v3" /><rect x="4" y="9" width="13" height="6" rx="1" fill="currentColor" stroke="none" /></svg>
);
export const IconSignal = (p: P) => (
  <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}><rect x="2" y="12" width="3" height="6" rx="1" /><rect x="7" y="9" width="3" height="9" rx="1" /><rect x="12" y="6" width="3" height="12" rx="1" /><rect x="17" y="3" width="3" height="15" rx="1" /></svg>
);
export const IconWifi = (p: P) => (
  <svg {...base(p)}><path d="M3 8.5a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0M9 15.5a4 4 0 0 1 6 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>
);
export const IconArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
