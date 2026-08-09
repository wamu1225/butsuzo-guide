// scripts/generate-ogp.ts — OGP画像（1200×630）を public/ogp.png に生成する。
// 実行: npx tsx scripts/generate-ogp.ts
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FONT = "'Yu Gothic','Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,'Noto Sans JP',sans-serif";
const SERIF = "'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3ece0"/>
      <stop offset="1" stop-color="#e8ddc9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="16" height="630" fill="#2b3a4a"/>
  <rect x="16" y="0" width="6" height="630" fill="#b3382c"/>
  <text x="96" y="196" font-family="${SERIF}" font-size="76" font-weight="700" fill="#2b3a4a">仏像の</text>
  <text x="96" y="278" font-family="${SERIF}" font-size="76" font-weight="700" fill="#2b3a4a">見分け方</text>
  <text x="96" y="352" font-family="${FONT}" font-size="26" fill="#5a5348">髪型・装身具・持物・印相の手がかりから、如来・菩薩・</text>
  <text x="96" y="390" font-family="${FONT}" font-size="26" fill="#5a5348">明王・天部を見分ける。国立博物館・文化庁の公開情報で。</text>
  <line x1="96" y1="456" x2="720" y2="456" stroke="#c9a24b" stroke-width="2"/>
  <text x="96" y="508" font-family="${FONT}" font-size="24" fill="#b3382c" font-weight="600">study-apps.com/butsuzo-guide/</text>
  <!-- 光背（円光・身光）と蓮座のシルエット（宗派色を避けた中立の意匠） -->
  <g transform="translate(1000 315)">
    <circle r="150" fill="none" stroke="#c9a24b" stroke-width="3"/>
    <circle r="115" fill="none" stroke="#c9a24b" stroke-width="1.6"/>
    <circle r="150" fill="#2b3a4a" opacity="0.06"/>
    <path d="M-70 158 Q0 118 70 158 L84 178 Q0 148 -84 178 Z" fill="#b3382c" opacity="0.85"/>
    <path d="M-84 178 Q0 148 84 178 L96 196 Q0 168 -96 196 Z" fill="#2b3a4a" opacity="0.75"/>
  </g>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'ogp.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ogp.png (1200x630) を生成: ${outPath}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
