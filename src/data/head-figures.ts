// src/data/head-figures.ts — 髪型・頭部の輪郭図（4階層）
// 見分けフロー第1問の4択と、読みもの「髪型と装身具で見分ける」で使う。
// App.tsx / IdentifyFlow.tsx と scripts/prerender.ts が同じ文字列を描くための SSOT。
//
// 描き分けの根拠：如来＝螺髪と肉髻／菩薩＝結い上げた髪（宝髻）と宝冠／
// 明王＝逆立つ炎のような髪（炎髪）／天部＝兜や髻。輪郭だけで4つが区別できることを狙う。
// 写真は使わない（寺院所蔵の像は著作物のため）。ここに描くのは特徴の対比であって、
// 特定の像の写生ではない。

export type HeadFigure = {
  id: 'nyorai' | 'bosatsu' | 'myoo' | 'tenbu';
  /** 図が示している輪郭の特徴。読み上げにも使う */
  label: string;
  svg: string;
};

const FACE = `<ellipse cx="40" cy="60" rx="16" ry="20" class="head-fig__skin"/>`;
const NECK = `<path d="M33,76 h14 v9 h-14 Z" class="head-fig__skin"/>
    <path d="M13,100 C17,89 29,84 40,84 C51,84 63,89 67,100 Z" class="head-fig__robe"/>`;

/** 螺髪の粒。頭頂から生え際にかけて並べる */
const RAHOTSU = [
  [32, 34], [40, 33], [48, 34],
  [27, 40], [33.5, 39], [40, 38.5], [46.5, 39], [53, 40],
  [25, 46], [31, 45], [37, 44.5], [43, 44.5], [49, 45], [55, 46],
]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" class="head-fig__curl"/>`)
  .join('\n    ');

export const HEAD_FIGURES: HeadFigure[] = [
  {
    id: 'nyorai',
    label: '頭頂が丸く盛り上がり、粒状の巻き髪が全体に並ぶ輪郭',
    svg: `<svg viewBox="0 0 80 100" class="head-fig" role="img" aria-label="如来の頭部。粒の並んだ髪と、頭頂の盛り上がり">
    ${NECK}
    ${FACE}
    <path d="M24,52 C24,36 30,28 40,28 C50,28 56,36 56,52 Z" class="head-fig__hair"/>
    <ellipse cx="40" cy="30" rx="9" ry="8" class="head-fig__hair"/>
    ${RAHOTSU}
    <path d="M31,32 A9,8 0 0 1 49,32" class="head-fig__ridge"/>
  </svg>`,
  },
  {
    id: 'bosatsu',
    label: '髪を高く結い上げ、額に冠をのせた輪郭',
    svg: `<svg viewBox="0 0 80 100" class="head-fig" role="img" aria-label="菩薩の頭部。高く結い上げた髪と宝冠">
    ${NECK}
    ${FACE}
    <path d="M25,50 C25,38 31,31 40,31 C49,31 55,38 55,50 Z" class="head-fig__hair"/>
    <path d="M32,40 C31,27 34,17 40,10 C46,17 49,27 48,40 Z" class="head-fig__hair"/>
    <rect x="31" y="27" width="18" height="4" rx="2" class="head-fig__gold"/>
    <path d="M24,44 L29,34 L34,44 Z M35,44 L40,32 L45,44 Z M46,44 L51,34 L56,44 Z" class="head-fig__gold"/>
    <rect x="22" y="43" width="36" height="6" rx="2" class="head-fig__gold"/>
  </svg>`,
  },
  {
    id: 'myoo',
    label: '髪が炎のように逆立ち、眉を吊り上げた輪郭',
    svg: `<svg viewBox="0 0 80 100" class="head-fig" role="img" aria-label="明王の頭部。逆立つ炎のような髪と怒りの表情">
    ${NECK}
    <path d="M22.8,64 Q17.7,61.7 6.2,59.5 Q17,54.9 21.5,51.6 Q19,46.7 11.3,37.7 Q22.7,40.9 28.2,41.1 Q29.3,35.7 28.8,23.9 Q35.8,33.4 40,37 Q44.2,33.4 51.2,23.9 Q50.7,35.7 51.8,41.1 Q57.3,40.9 68.7,37.7 Q61,46.7 58.5,51.6 Q63,54.9 73.8,59.5 Q62.3,61.7 57.2,64 Z" class="head-fig__hair"/>
    ${FACE}
    <path d="M28,54 L38,59" class="head-fig__stroke"/>
    <path d="M52,54 L42,59" class="head-fig__stroke"/>
  </svg>`,
  },
  {
    id: 'tenbu',
    label: '兜をかぶり、左右に庇が張り出した輪郭',
    svg: `<svg viewBox="0 0 80 100" class="head-fig" role="img" aria-label="天部の頭部。兜と、左右に張り出した庇">
    ${NECK}
    ${FACE}
    <path d="M21,52 C21,34 29,25 40,25 C51,25 59,34 59,52 Z" class="head-fig__metal"/>
    <path d="M33,26 Q40,10 47,26 Z" class="head-fig__gold"/>
    <path d="M15,50 Q40,60 65,50 L65,55 Q40,65 15,55 Z" class="head-fig__metal"/>
  </svg>`,
  },
];

export const headFigureById = (id: HeadFigure['id']) =>
  HEAD_FIGURES.find((f) => f.id === id)!;
