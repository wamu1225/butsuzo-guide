// src/components/MudraDiagram.tsx — 印相を示す簡略化した図解（手の位置と形を模式的に表す）。
// 写実的な手の描写ではなく、位置関係（右手/左手・上下・輪の有無）を伝えることに絞った
// スキーマティックな図。誤って特定の仏像の実写と誤解されないよう、あくまで模式図として示す。
import type { CSSProperties } from 'react';
import {
  MUDRA_HANDS,
  MUDRA_DIAGRAM_INK as INK,
  MUDRA_DIAGRAM_GOLD as GOLD,
  MUDRA_DIAGRAM_PAPER as PAPER,
  type HandSpec,
} from '../data/mudraDiagramData';

export default function MudraDiagram({ mudraId, style }: { mudraId: string; style?: CSSProperties }) {
  const hands = MUDRA_HANDS[mudraId];
  if (!hands) return null;
  return (
    <svg viewBox="0 0 144 130" className="mudra-diagram" role="img" aria-label="印相の模式図" style={style}>
      <rect width="144" height="130" rx="10" fill={PAPER} />
      <circle cx="72" cy="30" r="16" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M42 118 Q42 60 72 60 Q102 60 102 118 Z" fill="none" stroke={INK} strokeWidth="2" />
      {([hands.left, hands.right] as HandSpec[]).map((h, i) => (
        <g key={i}>
          <circle cx={h.x} cy={h.y} r="7" fill={GOLD} opacity="0.85" />
          {h.ring && <circle cx={h.x} cy={h.y} r="10.5" fill="none" stroke={GOLD} strokeWidth="1.4" />}
          {h.facing === 'up' && <line x1={h.x} y1={h.y - 11} x2={h.x} y2={h.y - 4} stroke={GOLD} strokeWidth="2" />}
          {h.facing === 'down' && <line x1={h.x} y1={h.y + 4} x2={h.x} y2={h.y + 11} stroke={GOLD} strokeWidth="2" />}
        </g>
      ))}
    </svg>
  );
}
