// src/components/MudraDiagram.tsx — 印相の模式図（手そのものを描き、指の形が判別できる縮尺にする）。
// mudraDiagramData.ts の生SVG文字列をそのまま使う（静的HTML側と完全に同一の描画を保証するため）。
import type { CSSProperties } from 'react';
import { MUDRA_DIAGRAMS } from '../data/mudraDiagramData';

export default function MudraDiagram({ mudraId, style }: { mudraId: string; style?: CSSProperties }) {
  const spec = MUDRA_DIAGRAMS[mudraId];
  if (!spec) return null;
  return (
    <figure className="mudra-figure" style={style}>
      <svg
        viewBox="0 0 188 160"
        className="mudra-diagram"
        role="img"
        aria-label={spec.label}
        dangerouslySetInnerHTML={{ __html: spec.inner }}
      />
      <figcaption className="mudra-figure__caption">{spec.caption}</figcaption>
    </figure>
  );
}
