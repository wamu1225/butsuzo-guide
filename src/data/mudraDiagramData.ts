// src/data/mudraDiagramData.ts — 印相の模式図に使う手の位置データ（SSOT）。
// React（components/MudraDiagram.tsx）とprerender.tsの両方がここから読む。
export interface HandSpec {
  x: number;
  y: number;
  ring?: boolean; // 指で輪をつくる形（定印・転法輪印・来迎印）
  facing?: 'up' | 'down'; // 手のひらの向き（施無畏印=上外向き・与願印=下外向き）
}

export const MUDRA_HANDS: Record<string, { left: HandSpec; right: HandSpec }> = {
  jouin: { left: { x: 60, y: 92, ring: true }, right: { x: 84, y: 92, ring: true } },
  'semui-in': { left: { x: 60, y: 96 }, right: { x: 88, y: 58, facing: 'up' } },
  'yogan-in': { left: { x: 56, y: 100, facing: 'down' }, right: { x: 88, y: 78 } },
  'tenborin-in': { left: { x: 62, y: 72, ring: true }, right: { x: 82, y: 72, ring: true } },
  'raigo-in': { left: { x: 56, y: 100, ring: true }, right: { x: 88, y: 58, ring: true } },
  'chiken-in': { left: { x: 68, y: 70 }, right: { x: 76, y: 70, ring: true } },
};

export const MUDRA_DIAGRAM_INK = '#2b3a4a';
export const MUDRA_DIAGRAM_GOLD = '#a8823a';
export const MUDRA_DIAGRAM_PAPER = '#f3ece0';

// 静的HTML向け：Reactを使わずSVG文字列を直接組み立てる（prerender.tsから利用）。
// components/MudraDiagram.tsx とまったく同じ座標・規則で描画する。
export function mudraDiagramSvg(mudraId: string): string {
  const hands = MUDRA_HANDS[mudraId];
  if (!hands) return '';
  const hand = (h: HandSpec) => {
    let s = `<circle cx="${h.x}" cy="${h.y}" r="7" fill="${MUDRA_DIAGRAM_GOLD}" opacity="0.85" />`;
    if (h.ring) s += `<circle cx="${h.x}" cy="${h.y}" r="10.5" fill="none" stroke="${MUDRA_DIAGRAM_GOLD}" stroke-width="1.4" />`;
    if (h.facing === 'up') s += `<line x1="${h.x}" y1="${h.y - 11}" x2="${h.x}" y2="${h.y - 4}" stroke="${MUDRA_DIAGRAM_GOLD}" stroke-width="2" />`;
    if (h.facing === 'down') s += `<line x1="${h.x}" y1="${h.y + 4}" x2="${h.x}" y2="${h.y + 11}" stroke="${MUDRA_DIAGRAM_GOLD}" stroke-width="2" />`;
    return s;
  };
  return `<svg viewBox="0 0 144 130" class="mudra-diagram" role="img" aria-label="印相の模式図">
    <rect width="144" height="130" rx="10" fill="${MUDRA_DIAGRAM_PAPER}" />
    <circle cx="72" cy="30" r="16" fill="none" stroke="${MUDRA_DIAGRAM_INK}" stroke-width="2" />
    <path d="M42 118 Q42 60 72 60 Q102 60 102 118 Z" fill="none" stroke="${MUDRA_DIAGRAM_INK}" stroke-width="2" />
    ${hand(hands.left)}
    ${hand(hands.right)}
  </svg>`;
}
