// src/data/mudra-figures.ts — 法界定印と阿弥陀定印の「輪の有無」比較図
// 読みもの「印相で見分ける」と、見分けフローの結果表示で使う。
// App.tsx / scripts/prerender.ts が同じ文字列を描くための SSOT（head-figures.ts と同じ方式）。
//
// 描き分けの根拠（WebSearch・複数の出典を突合済み。詳細はreports/butsuzo-guide.md）：
// 法界定印＝両手を重ね親指の先どうしを合わせるのみ（輪はつくらない・釈迦如来・大日如来〔胎蔵界〕）。
// 阿弥陀定印（弥陀定印）＝両手を重ね親指と人差し指で輪をつくる（阿弥陀如来）。
// 写真は使わない（寺院所蔵の像は著作物のため）。手の甲を上から見た模式図として描く。

export type MudraFigure = {
  id: 'hokkai-jouin' | 'amida-jouin';
  /** 図が示している形の特徴。読み上げにも使う */
  label: string;
  svg: string;
};

const HANDS = `<ellipse cx="50" cy="46" rx="36" ry="15" class="mudra-fig__hand"/>
    <ellipse cx="50" cy="54" rx="36" ry="15" class="mudra-fig__hand"/>`;

export const MUDRA_FIGURES: MudraFigure[] = [
  {
    id: 'hokkai-jouin',
    label: '両手を重ね、親指の先どうしを合わせるだけで輪はつくらない',
    svg: `<svg viewBox="0 0 100 70" class="mudra-fig" role="img" aria-label="法界定印。両手を重ね、親指の先を合わせるが輪はつくらない">
    ${HANDS}
    <line x1="44" y1="40" x2="56" y2="40" class="mudra-fig__stroke"/>
  </svg>`,
  },
  {
    id: 'amida-jouin',
    label: '両手を重ね、親指と人差し指で輪をつくる',
    svg: `<svg viewBox="0 0 100 70" class="mudra-fig" role="img" aria-label="阿弥陀定印。両手を重ね、親指と人差し指で輪をつくる">
    ${HANDS}
    <circle cx="50" cy="39" r="8" class="mudra-fig__ring"/>
  </svg>`,
  },
];

export const mudraFigureById = (id: MudraFigure['id']) =>
  MUDRA_FIGURES.find((f) => f.id === id)!;
