// src/App.tsx — ルーティング + トップ（見分けフロー）＋ 図鑑
import { useEffect, useState, type ReactNode } from 'react';
import IdentifyFlow from './components/IdentifyFlow';
import { tiers } from './data/tiers';
import { buddhasByTier } from './data/buddhas';
import { famousStatues } from './data/statues';
import { articles, articleBySlug, type Article } from './data/articles';
import { ABOUT_CONTENT, PRIVACY_CONTENT } from './data/static-pages';
import './App.css';

// ## 見出しと段落だけを扱う軽量マークダウン→JSX変換（articles.ts の本文と共有）
function parseArticleBody(md: string): ReactNode[] {
  return md
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i}>{block.slice(3).trim()}</h2>;
      }
      return <p key={i}>{block}</p>;
    });
}

const SITE_NAME = '仏像の見分け方ガイド';
const BASE = '/butsuzo-guide';

function getCurrentPath(): string {
  const p = window.location.pathname.replace(BASE, '').replace(/\/$/, '');
  return p || '/';
}

function Header({ path, navigate }: { path: string; navigate: (p: string) => void }) {
  const link = (to: string, label: string) => (
    <button
      className={`site-nav__link ${path === to ? 'is-current' : ''}`}
      onClick={() => navigate(to)}
      type="button"
    >
      {label}
    </button>
  );
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button className="site-header__title" onClick={() => navigate('/')} type="button">
          {SITE_NAME}
        </button>
        <nav className="site-nav">
          {link('/', '見分けフロー')}
          {link('/articles', '読みもの')}
          {link('/zukan', '図鑑')}
          {link('/about', 'サイトについて')}
        </nav>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (p: string) => void }) {
  return (
    <footer className="site-footer">
      <p className="site-footer__disclaimer">
        本サイトは仏教美術を文化・美術史として紹介する個人運営のサイトです。宗派の優劣や信仰の是非を論じるものではありません。
      </p>
      <nav className="site-footer__nav">
        <button onClick={() => navigate('/about')} type="button">サイトについて</button>
        <button onClick={() => navigate('/privacy')} type="button">プライバシーポリシー</button>
      </nav>
    </footer>
  );
}

function TopView() {
  return (
    <>
      <section className="hero">
        <h1 className="hero__title">仏像を、手がかりから見分ける</h1>
        <p className="hero__lead">
          髪型・装身具・表情・持物・印相を手がかりに、目の前の仏像が如来・菩薩・明王・天部のどれで、何という仏かを判定します。
        </p>
      </section>
      <section className="section">
        <IdentifyFlow />
      </section>
      <section className="section">
        <h2 className="section__heading">4つの階層</h2>
        <div className="tier-grid">
          {tiers.map((t) => (
            <div key={t.id} className="tier-card">
              <h3 className="tier-card__name">{t.name}<span className="tier-card__reading">（{t.reading}）</span></h3>
              <p className="tier-card__position">{t.position}</p>
              <dl className="tier-card__facts">
                <div><dt>髪型</dt><dd>{t.hairstyleShort}</dd></div>
                <div><dt>装身具</dt><dd>{t.ornamentShort}</dd></div>
                <div><dt>表情</dt><dd>{t.expressionShort}</dd></div>
                <div><dt>服装</dt><dd>{t.clothingShort}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ZukanView() {
  return (
    <>
      <section className="hero hero--compact">
        <h1 className="hero__title">仏像図鑑</h1>
        <p className="hero__lead">階層ごとの代表的な仏と、実際に伝わる著名な仏像をまとめました。</p>
      </section>
      {tiers.map((t) => {
        const list = buddhasByTier(t.id);
        if (list.length === 0) return null;
        return (
          <section className="section" key={t.id}>
            <h2 className="section__heading">{t.name}（{t.reading}）</h2>
            <div className="zukan-grid">
              {list.map((b) => (
                <article className="zukan-card" key={b.id}>
                  <h3 className="zukan-card__name">{b.name}</h3>
                  <p className="zukan-card__reading">{b.reading}</p>
                  <p className="zukan-card__feature">{b.keyFeature}</p>
                  <p className="zukan-card__desc">{b.description}</p>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      <section className="section">
        <h2 className="section__heading">著名な仏像と所在</h2>
        <div className="statue-list">
          {famousStatues.map((s) => (
            <article className="statue-card" key={s.id}>
              <h3 className="statue-card__name">{s.name}</h3>
              <p className="statue-card__temple">{s.temple}</p>
              <p className="statue-card__meta">{s.designation}・{s.era}・{s.material}</p>
              <p className="statue-card__note">{s.note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ArticlesIndexView({ navigate }: { navigate: (p: string) => void }) {
  return (
    <>
      <section className="hero hero--compact">
        <h1 className="hero__title">読みもの</h1>
        <p className="hero__lead">仏像の見分け方を、順を追って解説します。</p>
      </section>
      <section className="section">
        <ul className="article-list">
          {articles.map((a) => (
            <li key={a.slug}>
              <button className="article-list__link" onClick={() => navigate(`/articles/${a.slug}`)} type="button">
                <span className="article-list__title">{a.title}</span>
                <span className="article-list__desc">{a.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ArticleView({ article, navigate }: { article: Article; navigate: (p: string) => void }) {
  return (
    <article className="page-article">
      <nav className="article-breadcrumb">
        <button onClick={() => navigate('/articles')} type="button">← 読みもの一覧</button>
      </nav>
      <h1>{article.title}</h1>
      {parseArticleBody(article.content)}
    </article>
  );
}

function AboutView() {
  return (
    <article className="page-article">
      <h1>サイトについて</h1>
      {parseArticleBody(ABOUT_CONTENT)}
    </article>
  );
}

function PrivacyView() {
  return (
    <article className="page-article">
      <h1>プライバシーポリシー</h1>
      {parseArticleBody(PRIVACY_CONTENT)}
    </article>
  );
}

export default function App() {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onPop = () => setPath(getCurrentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, '', BASE + (to === '/' ? '/' : to));
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  let content: ReactNode;
  if (path === '/' || path === '') content = <TopView />;
  else if (path === '/zukan') content = <ZukanView />;
  else if (path === '/articles') content = <ArticlesIndexView navigate={navigate} />;
  else if (path.startsWith('/articles/')) {
    const article = articleBySlug(path.slice('/articles/'.length));
    content = article ? <ArticleView article={article} navigate={navigate} /> : <TopView />;
  }
  else if (path === '/about') content = <AboutView />;
  else if (path === '/privacy') content = <PrivacyView />;
  else content = <TopView />;

  return (
    <div className="app-shell">
      <Header path={path} navigate={navigate} />
      <main className="main">{content}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
