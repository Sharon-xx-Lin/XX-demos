export interface Material {
  id: string;
  title: string;
  zh: string;
  cover: string;
  duration: string;
  short?: boolean;
  level: string; // 易/中/难
  speed?: string; // 语速慢/中/快
  source: string;
}

const IMG = {
  chip: 'https://images.pexels.com/photos/34924856/pexels-photo-34924856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chip2: 'https://images.pexels.com/photos/34924858/pexels-photo-34924858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  factory: 'https://images.pexels.com/photos/34207359/pexels-photo-34207359.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kpop: 'https://images.pexels.com/photos/13230484/pexels-photo-13230484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kpop2: 'https://images.pexels.com/photos/4218027/pexels-photo-4218027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  manager: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  podcast: 'https://images.pexels.com/photos/32007691/pexels-photo-32007691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const featured: Material = {
  id: 'chip',
  title: 'Why AI chips are so hard to make',
  zh: '两分半讲清芯片制造的三个瓶颈',
  cover: IMG.chip,
  duration: '2:40',
  short: true,
  level: '易',
  speed: '语速慢',
  source: 'YouTube',
};

export const todayList: Material[] = [
  featured,
  {
    id: 'kpop',
    title: 'The economics behind K-pop tours',
    zh: '巡演的成本结构与盈利模式',
    cover: IMG.kpop,
    duration: '14:20',
    level: '中',
    speed: '语速中',
    source: 'Apple Podcasts',
  },
  {
    id: 'manager',
    title: 'What makes a good manager',
    zh: '三个反直觉的管理误区',
    cover: IMG.manager,
    duration: '9:15',
    level: '中',
    speed: '语速中',
    source: 'YouTube',
  },
];

export const firstOther: Material = {
  id: 'manager',
  title: 'What makes a good manager',
  zh: '三个反直觉的管理误区',
  cover: IMG.manager,
  duration: '9:15',
  level: '中',
  speed: '语速中',
  source: 'YouTube',
};

export const community: { m: Material; note: string; by: string }[] = [
  {
    m: { id: 'c1', title: 'How chip factories actually work', zh: '', cover: IMG.factory, duration: '8:20', level: '中', source: 'YouTube' },
    note: '比我看过的所有科普都清楚，语速也慢',
    by: '建宇',
  },
  {
    m: { id: 'c2', title: 'The business of K-pop, explained', zh: '', cover: IMG.kpop2, duration: '21:05', level: '难', source: 'Apple Podcasts' },
    note: '主播口音很好懂，适合入门听播客',
    by: 'Mia',
  },
  {
    m: { id: 'c3', title: 'Why some accents are easier', zh: '', cover: IMG.podcast, duration: '2:55', short: true, level: '易', source: 'YouTube' },
    note: '短，三分钟，没时间的时候正好',
    by: '老陈',
  },
];

// 报告数据（不规整真实感）
export const report = {
  minutes: 7,
  todayCount: 3,
  total: 47,
  material: { title: 'Why AI chips are so hard to make', source: 'YouTube', progress: 43 },
  corrections: [
    {
      said: 'why make AI chip is difficult',
      better: 'why AI chips are so hard to make',
      note: '母语者更常说 hard to make，比 difficult 口语。',
    },
    {
      said: 'the machine is very expensive',
      better: 'the equipment costs a fortune',
      note: '聊价格时的常用说法。',
    },
  ],
  saved: [
    { en: "It's hard to make.", zh: '这东西很难造', checked: true },
    { en: 'It costs a fortune.', zh: '贵得要命', checked: true },
    { en: 'What surprised me was…', zh: '让我意外的是…', checked: false },
  ],
  transcript: [
    { who: 'ai', text: 'So, what was it about? One sentence is enough.' },
    { who: 'me', text: 'It talk about why make AI chip is difficult, and the machine is very expensive.' },
    { who: 'ai', text: 'Right — it talks about why AI chips are so hard to make. What surprised you most?' },
    { who: 'me', text: 'The lithography machine. Only one company can make it.' },
  ],
};

// 对话轮次（英文当前话语 + 中文翻译）
export const chatTurns = [
  {
    ai: 'So, what was it about? One sentence is enough.',
    zh: '它讲的是什么？一句话就够了。',
    you: '',
  },
  {
    ai: 'Right — it talks about why AI chips are so hard to make. What surprised you most?',
    zh: '没错——它讲的是为什么 AI 芯片这么难造。最让你意外的是什么？',
    you: 'It talk about why make AI chip is difficult, and the machine is very expensive.',
  },
];

export const heatmap = {
  // 每格：0 空缺 / 1-4 档
  weeks: 6,
  cols: 14,
};

export function genHeatData(empty = false): number[] {
  if (empty) return Array(56).fill(0);
  // 固定的不规整分布
  const seed = [
    2, 0, 1, 3, 0, 2, 0, 4, 1, 2, 3, 0, 1, 1,
    2, 1, 3, 0, 1, 4, 1, 0, 2, 3, 0, 1, 3, 2,
    3, 0, 1, 2, 1, 2, 2, 3, 4, 1, 2, 0, 1, 3,
    1, 2, 0, 0, 2, 3, 1, 2, 1, 3, 4, 2, 1, 1,
  ];
  return seed;
}

export const themeBars = [
  { name: 'AI 与科技', n: 17, max: 17 },
  { name: 'KPOP', n: 9, max: 17 },
  { name: '商业财经', n: 6, max: 17 },
  { name: '科普', n: 4, max: 17 },
];

export const interests = [
  'AI 与科技', 'KPOP', '商业财经', '影视剧集', '旅行', '体育', '科普',
  '职场与沟通', '时事新闻', '游戏', '美食', '音乐', '心理与自我成长',
  '健康与运动', '民族与人文', '环境与可持续',
];

export const consumeSubtitles = [
  { text: 'Making a modern chip takes about three months.', cur: false },
  { text: "And the hardest part isn't the design — it's the lithography.", cur: true },
  { text: 'Only one company in the world makes these machines.', cur: false },
  { text: 'Each one costs more than a commercial airplane.', cur: false },
];
