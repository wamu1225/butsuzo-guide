// src/data/mudraDiagramData.ts — 印相の模式図（手そのものを大きく描き、指の形が判別できる縮尺にする）。
// 2026-08-11・O-2-17の差し戻しを受けて全面再設計：
// 旧版は「頭＋胴＋塗り円2つ」で5種の違いが手の位置だけしか表現できず、
// 本文が説明する「指で輪をつくる」「指を握る」等が図に反映されていなかった。
// 今回は全身シルエットをやめ、手そのもの（掌＋指の線）を大きく描く。
// 各図は固有のaria-labelとfigcaptionを持つ（読み上げ環境での区別のため）。
//
// SSOT：この生SVG文字列を React（components/MudraDiagram.tsx）と
// prerender.ts の両方がそのまま利用する（描画結果を完全に一致させるため、
// パラメータ化した再構築はせず文字列そのものを共有する）。

export interface MudraDiagramSpec {
  label: string; // aria-label
  caption: string; // figcaption
  inner: string; // <svg>内側のマークアップ
}

const INK = '#2b3a4a';
const GOLD = '#a8823a';
const GOLD_LIGHT = '#c9a24b';

export const MUDRA_DIAGRAMS: Record<string, MudraDiagramSpec> = {
  jouin: {
    label: '定印の模式図：両手を重ねて膝の上に置き、親指どうしを触れさせて輪をつくる',
    caption: '定印：重ねた両手の親指が触れ合い、輪をつくる',
    inner: `
      <ellipse cx="88" cy="112" rx="34" ry="15" fill="none" stroke="${INK}" stroke-width="2.4" />
      <ellipse cx="100" cy="100" rx="30" ry="14" fill="none" stroke="${INK}" stroke-width="2.4" />
      <path d="M76 90 Q88 78 100 88" fill="none" stroke="${INK}" stroke-width="2" />
      <circle cx="88" cy="86" r="7" fill="none" stroke="${GOLD}" stroke-width="2.6" />
    `,
  },
  'semui-in': {
    label: '施無畏印と与願印の模式図：右手を上げ指をそろえて手のひらを正面に向け、左手は下げて同じく手のひらを正面に向ける',
    caption: '施無畏印（右手・上）と与願印（左手・下）：指をそろえた手のひらを正面に向ける',
    inner: `
      <rect x="118" y="26" width="26" height="34" rx="12" fill="none" stroke="${INK}" stroke-width="2.4" />
      <line x1="122" y1="26" x2="120" y2="8" stroke="${INK}" stroke-width="2.2" />
      <line x1="128" y1="24" x2="127" y2="4" stroke="${INK}" stroke-width="2.2" />
      <line x1="134" y1="24" x2="136" y2="4" stroke="${INK}" stroke-width="2.2" />
      <line x1="140" y1="26" x2="144" y2="8" stroke="${INK}" stroke-width="2.2" />
      <line x1="118" y1="34" x2="104" y2="30" stroke="${INK}" stroke-width="2.2" />
      <rect x="38" y="96" width="26" height="34" rx="12" fill="none" stroke="${INK}" stroke-width="2.4" />
      <line x1="42" y1="130" x2="40" y2="148" stroke="${INK}" stroke-width="2.2" />
      <line x1="48" y1="132" x2="47" y2="152" stroke="${INK}" stroke-width="2.2" />
      <line x1="54" y1="132" x2="56" y2="152" stroke="${INK}" stroke-width="2.2" />
      <line x1="60" y1="130" x2="64" y2="148" stroke="${INK}" stroke-width="2.2" />
      <line x1="64" y1="102" x2="80" y2="98" stroke="${INK}" stroke-width="2.2" />
    `,
  },
  'tenborin-in': {
    label: '転法輪印の模式図：胸の前で両手の指を組み合わせ、輪をつくる',
    caption: '転法輪印：胸の前で両手の指が組み合い、輪をつくる',
    inner: `
      <ellipse cx="78" cy="80" rx="22" ry="16" fill="none" stroke="${INK}" stroke-width="2.4" transform="rotate(-18 78 80)" />
      <ellipse cx="112" cy="80" rx="22" ry="16" fill="none" stroke="${INK}" stroke-width="2.4" transform="rotate(18 112 80)" />
      <circle cx="95" cy="78" r="15" fill="none" stroke="${GOLD}" stroke-width="2.6" />
      <path d="M85 68 L90 78 M95 65 L95 78 M105 68 L100 78" stroke="${GOLD_LIGHT}" stroke-width="1.8" />
    `,
  },
  'raigo-in': {
    label: '来迎印の模式図：右手を上げ左手を下げ、それぞれ親指と人差し指で輪をつくる',
    caption: '来迎印：右手（上）と左手（下）が、それぞれ指で輪をつくる',
    inner: `
      <ellipse cx="128" cy="42" rx="16" ry="13" fill="none" stroke="${INK}" stroke-width="2.4" />
      <circle cx="128" cy="26" r="7" fill="none" stroke="${GOLD}" stroke-width="2.6" />
      <line x1="118" y1="50" x2="104" y2="46" stroke="${INK}" stroke-width="2.2" />
      <ellipse cx="56" cy="114" rx="16" ry="13" fill="none" stroke="${INK}" stroke-width="2.4" />
      <circle cx="56" cy="130" r="7" fill="none" stroke="${GOLD}" stroke-width="2.6" />
      <line x1="66" y1="106" x2="80" y2="110" stroke="${INK}" stroke-width="2.2" />
    `,
  },
  'chiken-in': {
    label: '智拳印の模式図：左手の人差し指を立て、右手でその指を握って包む',
    caption: '智拳印：左手の人差し指を、右手が握って包む',
    inner: `
      <line x1="94" y1="30" x2="94" y2="70" stroke="${INK}" stroke-width="3" stroke-linecap="round" />
      <circle cx="94" cy="88" r="22" fill="none" stroke="${INK}" stroke-width="2.6" />
      <path d="M76 84 Q94 72 112 84" fill="none" stroke="${GOLD}" stroke-width="2" />
      <path d="M74 92 Q94 104 114 92" fill="none" stroke="${GOLD}" stroke-width="2" />
    `,
  },
};

export function mudraDiagramSvg(mudraId: string): string {
  const spec = MUDRA_DIAGRAMS[mudraId];
  if (!spec) return '';
  return `<figure class="mudra-figure">
  <svg viewBox="0 0 188 160" class="mudra-diagram" role="img" aria-label="${spec.label}">${spec.inner}</svg>
  <figcaption class="mudra-figure__caption">${spec.caption}</figcaption>
</figure>`;
}
