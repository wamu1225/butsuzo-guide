// scripts/prerender.ts — 仏像の見分け方ガイド SSG
// dist/index.html をテンプレートに、各ページのHTMLを物理生成する。
import * as fs from 'fs';
import * as path from 'path';
import { tiers } from '../src/data/tiers.ts';
import { buddhasByTier } from '../src/data/buddhas.ts';
import { famousStatues } from '../src/data/statues.ts';
import { articles } from '../src/data/articles.ts';
import { ABOUT_CONTENT, PRIVACY_CONTENT } from '../src/data/static-pages.ts';
import { HEAD_FIGURES } from '../src/data/head-figures.ts';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://study-apps.com/butsuzo-guide';
const BASE = '/butsuzo-guide';

console.log('--- butsuzo-guide SSG Pre-rendering ---');

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('Error: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
// 1階層下（/slug/）向け：相対パスを1段上へ
const subDirTemplateHtml = templateHtml
  .replace(/src="\.\/assets\//g, 'src="../assets/')
  .replace(/href="\.\/assets\//g, 'href="../assets/');
// 2階層下（/articles/slug/）向け：相対パスを2段上へ
const subSubDirTemplateHtml = templateHtml
  .replace(/src="\.\/assets\//g, 'src="../../assets/')
  .replace(/href="\.\/assets\//g, 'href="../../assets/');

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ## 見出し・表・段落を扱う軽量マークダウン→HTML
// （articles.ts / App.tsx の parseArticleBody と対になる規則。両者の出力を一致させること）
function markdownToHtml(md: string): string {
  return md
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      if (b.startsWith('## ')) return `<h2 class="content-h2">${escapeHtml(b.slice(3).trim())}</h2>`;
      if (b === '[[figure:heads]]') return headFigRowHtml;
      if (b.startsWith('|') && b.includes('\n')) {
        const rows = b.split('\n').map((r) => r.trim()).filter((r) => r.startsWith('|'))
          .map((r) => r.split('|').slice(1, -1).map((c) => c.trim()));
        const body = rows.filter((r) => !r.every((c) => /^[-:]+$/.test(c)));
        if (body.length >= 2) {
          const head = body[0];
          const rest = body.slice(1);
          return `<div class="content-table-wrap"><table class="content-table"><thead><tr>${
            head.map((c) => `<th>${escapeHtml(c)}</th>`).join('')
          }</tr></thead><tbody>${
            rest.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')
          }</tbody></table></div>`;
        }
      }
      return `<p class="content-p">${escapeHtml(b)}</p>`;
    })
    .join('\n');
}

function applyMeta(html: string, title: string, description: string, urlPath: string): string {
  const fullTitle = urlPath === '/' ? templateTitleMatch : `${title} | 仏像の見分け方ガイド`;
  const pageUrl = `${BASE_URL}${urlPath}`;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${pageUrl}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${pageUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
}
const templateTitleMatch = '仏像の見分け方ガイド | 印相・持物・髪型から尊格を判定';

function writeHtml(dir: string, html: string) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// ── トップページ：静的フォールバック（判定ツールはJS必須のため、階層概要とリンクを表示） ──
const tierGridHtml = tiers
  .map(
    (t) => `<div class="tier-card">
      <h3 class="tier-card__name">${escapeHtml(t.name)}<span class="tier-card__reading">（${escapeHtml(t.reading)}）</span></h3>
      <p class="tier-card__position">${escapeHtml(t.position)}</p>
      <dl class="tier-card__facts">
        <div><dt>髪型</dt><dd>${escapeHtml(t.hairstyleShort)}</dd></div>
        <div><dt>装身具</dt><dd>${escapeHtml(t.ornamentShort)}</dd></div>
        <div><dt>表情</dt><dd>${escapeHtml(t.expressionShort)}</dd></div>
        <div><dt>服装</dt><dd>${escapeHtml(t.clothingShort)}</dd></div>
      </dl>
    </div>`
  )
  .join('\n');

const articleLinksHtml = articles
  .map((a) => `<li><a href="${BASE}/articles/${a.slug}/">${escapeHtml(a.title)}</a>：${escapeHtml(a.description)}</li>`)
  .join('\n');

// 髪型の4分類は輪郭の違いそのものなので、静的HTML側にも同じ図を出す
const tierNames: Record<string, string> = {
  nyorai: '如来', bosatsu: '菩薩', myoo: '明王', tenbu: '天部',
};
const headFigRowHtml = `<ul class="head-fig-row">${HEAD_FIGURES.map(
  (f) => `<li>${f.svg}<strong>${escapeHtml(tierNames[f.id])}</strong>${escapeHtml(f.label)}</li>`
).join('\n')}</ul>`;

const rootFallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
  <h1>仏像を、手がかりから見分ける</h1>
  <p>髪型・装身具・表情・持物・印相を手がかりに、目の前の仏像が如来・菩薩・明王・天部のどれで、何という仏かを判定します。判定ツールはJavaScriptが有効な環境でご利用いただけます。</p>
  <h2>髪型で4つに分かれる</h2>
  <p>まず頭を見ます。髪の形だけで、四つの階層のどれかまで絞れます。</p>
  ${headFigRowHtml}
  <h2>4つの階層</h2>
  <div class="tier-grid">${tierGridHtml}</div>
  <h2>読みもの</h2>
  <ul>${articleLinksHtml}</ul>
  <p><a href="${BASE}/zukan/">仏像図鑑を見る →</a></p>
</article>`;

let rootHtml = applyMeta(templateHtml, '', '仏像を、髪型・装身具・表情・持物・印相の手がかりから如来・菩薩・明王・天部のどれか、何という仏かを見分けるガイド。東京・京都・奈良の国立博物館や文化庁の公開情報にもとづき、見分けの決定打とその理由（Why）を解説します。', '/');
rootHtml = rootHtml.replace('<div id="root"></div>', `<div id="root">${rootFallback}</div>`);
writeHtml(DIST_DIR, rootHtml);
console.log('✓ トップページ');

// ── /zukan/ ──
const zukanTiersHtml = tiers
  .map((t) => {
    const list = buddhasByTier(t.id);
    if (list.length === 0) return '';
    const cards = list
      .map(
        (b) => `<article class="zukan-card">
        <h3 class="zukan-card__name">${escapeHtml(b.name)}</h3>
        <p class="zukan-card__reading">${escapeHtml(b.reading)}</p>
        <p class="zukan-card__feature">${escapeHtml(b.keyFeature)}</p>
        <p class="zukan-card__desc">${escapeHtml(b.description)}</p>
      </article>`
      )
      .join('\n');
    return `<section class="section"><h2 class="section__heading">${escapeHtml(t.name)}（${escapeHtml(t.reading)}）</h2><div class="zukan-grid">${cards}</div></section>`;
  })
  .join('\n');

const statueListHtml = famousStatues
  .map(
    (s) => `<article class="statue-card">
    <h3 class="statue-card__name">${escapeHtml(s.name)}</h3>
    <p class="statue-card__temple">${escapeHtml(s.temple)}</p>
    <p class="statue-card__meta">${escapeHtml(s.designation)}・${escapeHtml(s.era)}・${escapeHtml(s.material)}</p>
    <p class="statue-card__note">${escapeHtml(s.note)}</p>
  </article>`
  )
  .join('\n');

const zukanFallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
  <h1>仏像図鑑</h1>
  <p>階層ごとの代表的な仏と、実際に伝わる著名な仏像をまとめました。</p>
  ${zukanTiersHtml}
  <h2 class="section__heading">著名な仏像と所在</h2>
  <div class="statue-list">${statueListHtml}</div>
  <p><a href="${BASE}/">← トップへ戻る</a></p>
</article>`;

let zukanHtml = applyMeta(subDirTemplateHtml, '仏像図鑑', '階層ごとの代表的な仏と、実際に伝わる著名な仏像をまとめた図鑑。国立博物館・文化庁の公開情報にもとづき、印相・持物・見分けの決め手を解説します。', '/zukan/');
zukanHtml = zukanHtml.replace('<div id="root"></div>', `<div id="root">${zukanFallback}</div>`);
writeHtml(path.join(DIST_DIR, 'zukan'), zukanHtml);
console.log('✓ /zukan/');

// ── /articles/（読みもの一覧） ──
const articlesIndexList = articles
  .map((a) => `<li><a href="${BASE}/articles/${a.slug}/">${escapeHtml(a.title)}</a><br><span style="color:#5a6472;font-size:0.9rem">${escapeHtml(a.description)}</span></li>`)
  .join('\n');
const articlesIndexFallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
  <h1>読みもの</h1>
  <p>仏像の見分け方を、順を追って解説します。</p>
  <ul style="list-style:none;padding:0">${articlesIndexList}</ul>
  <p><a href="${BASE}/">← トップへ戻る</a></p>
</article>`;
let articlesIndexHtml = applyMeta(subDirTemplateHtml, '読みもの', '仏像の見分け方を順を追って解説する記事一覧。4つの階層、髪型と装身具、印相、持物、よくある混同、FAQ。', '/articles/');
articlesIndexHtml = articlesIndexHtml.replace('<div id="root"></div>', `<div id="root">${articlesIndexFallback}</div>`);
writeHtml(path.join(DIST_DIR, 'articles'), articlesIndexHtml);
console.log('✓ /articles/');

// ── /articles/<slug>/ ──
for (const a of articles) {
  const bodyHtml = markdownToHtml(a.content);
  const fallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
    <nav><a href="${BASE}/articles/">← 読みもの一覧</a></nav>
    <h1>${escapeHtml(a.title)}</h1>
    ${bodyHtml}
  </article>`;
  let html = applyMeta(subSubDirTemplateHtml, a.title, a.description, `/articles/${a.slug}/`);
  html = html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
  const pageJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    url: `${BASE_URL}/articles/${a.slug}/`,
  });
  html = html.replace('</head>', `<script type="application/ld+json">${pageJsonLd}</script>\n  </head>`);
  writeHtml(path.join(DIST_DIR, 'articles', a.slug), html);
}
console.log(`✓ /articles/<slug>/ 全${articles.length}件`);

// ── about / privacy は既存の src/data/static-pages.ts をそのまま利用 ──
const aboutFallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
  ${markdownToHtml(ABOUT_CONTENT)}
  <p><a href="${BASE}/">← トップへ戻る</a></p>
</article>`;
let aboutHtml = applyMeta(subDirTemplateHtml, 'サイトについて', '仏像の見分け方ガイドについて。本サイトの目的と情報源、編集方針を説明します。', '/about/');
aboutHtml = aboutHtml.replace('<div id="root"></div>', `<div id="root">${aboutFallback}</div>`);
writeHtml(path.join(DIST_DIR, 'about'), aboutHtml);

const privacyFallback = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:780px;margin:0 auto;padding:24px 16px">
  ${markdownToHtml(PRIVACY_CONTENT)}
  <p><a href="${BASE}/">← トップへ戻る</a></p>
</article>`;
let privacyHtml = applyMeta(subDirTemplateHtml, 'プライバシーポリシー', '仏像の見分け方ガイドのプライバシーポリシー。Cookie・アクセス解析・広告の使用について。', '/privacy/');
privacyHtml = privacyHtml.replace('<div id="root"></div>', `<div id="root">${privacyFallback}</div>`);
writeHtml(path.join(DIST_DIR, 'privacy'), privacyHtml);
console.log('✓ /about/ /privacy/');

// ── sitemap.xml ──
// lastmod はページ単位の実更新日（O-2-27）。articles は既存の a.updatedAt をそのまま使う。
const today = new Date().toISOString().split('T')[0];
const urls = [
  { loc: `${BASE_URL}/`, lastmod: today, priority: '1.0' },
  { loc: `${BASE_URL}/zukan/`, lastmod: today, priority: '0.8' },
  { loc: `${BASE_URL}/articles/`, lastmod: today, priority: '0.7' },
  ...articles.map((a) => ({ loc: `${BASE_URL}/articles/${a.slug}/`, lastmod: a.updatedAt, priority: '0.8' })),
  { loc: `${BASE_URL}/about/`, lastmod: today, priority: '0.3' },
  { loc: `${BASE_URL}/privacy/`, lastmod: today, priority: '0.2' },
];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
console.log(`✓ sitemap.xml（${urls.length}件）`);

console.log('--- Done ---');
