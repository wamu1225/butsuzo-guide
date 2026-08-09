// src/components/IdentifyFlow.tsx — 仏像の見分けフロー（判定ツール）
// 髪型→階層の判定、続いて手がかり（印相・持物・特徴）から代表仏を絞り込む2段階の決定木。
import { useState } from 'react';
import { tiers, type Tier, type TierId } from '../data/tiers';
import { buddhasByTier, type RepresentativeBuddha } from '../data/buddhas';
import { mudraById } from '../data/mudras';
import { heldObjectById } from '../data/attributes';

const HAIRSTYLE_OPTIONS: { tier: TierId; label: string; hint: string }[] = [
  { tier: 'nyorai', label: '螺髪（巻き貝状の粒がびっしり並ぶ）', hint: '頭頂が盛り上がる（肉髻）' },
  { tier: 'bosatsu', label: '高く結い上げた髪に、宝冠を戴く', hint: '髪飾りや冠が華やか' },
  { tier: 'myoo', label: '逆立つ炎のような髪', hint: '表情も怒っている（忿怒相）' },
  { tier: 'tenbu', label: '髻や兜、天女風の髪など', hint: '甲冑や唐風の衣をまとう' },
];

export default function IdentifyFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tierId, setTierId] = useState<TierId | null>(null);
  const [buddha, setBuddha] = useState<RepresentativeBuddha | null>(null);

  const tier: Tier | null = tierId ? tiers.find((t) => t.id === tierId) ?? null : null;
  const candidates = tierId ? buddhasByTier(tierId) : [];

  const reset = () => {
    setStep(1);
    setTierId(null);
    setBuddha(null);
  };

  const chooseTier = (id: TierId) => {
    setTierId(id);
    setStep(2);
  };

  const chooseBuddha = (b: RepresentativeBuddha) => {
    setBuddha(b);
    setStep(3);
  };

  return (
    <div className="identify-flow">
      <div className="identify-flow__steps" aria-hidden="true">
        <span className={step >= 1 ? 'is-active' : ''}>1 髪型</span>
        <span className="identify-flow__sep">→</span>
        <span className={step >= 2 ? 'is-active' : ''}>2 手がかり</span>
        <span className="identify-flow__sep">→</span>
        <span className={step >= 3 ? 'is-active' : ''}>3 判定</span>
      </div>

      {step === 1 && (
        <div className="identify-flow__panel">
          <h3 className="identify-flow__question">その仏像の髪型・頭部は、どれに近いですか？</h3>
          <div className="identify-flow__choices">
            {HAIRSTYLE_OPTIONS.map((opt) => (
              <button
                key={opt.tier}
                className="identify-flow__choice"
                onClick={() => chooseTier(opt.tier)}
                type="button"
              >
                <span className="identify-flow__choice-label">{opt.label}</span>
                <span className="identify-flow__choice-hint">{opt.hint}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && tier && (
        <div className="identify-flow__panel">
          <div className="identify-flow__tier-badge">
            髪型から、<strong>{tier.name}（{tier.reading}）</strong>の可能性が高いです
          </div>
          <p className="identify-flow__tier-desc">{tier.position}。{tier.role}。</p>
          <h3 className="identify-flow__question">持物（手に持つ道具）や印相（手の形）、際立った特徴はありますか？</h3>
          <div className="identify-flow__choices identify-flow__choices--buddha">
            {candidates.map((b) => (
              <button
                key={b.id}
                className="identify-flow__choice"
                onClick={() => chooseBuddha(b)}
                type="button"
              >
                <span className="identify-flow__choice-label">{b.name}</span>
                <span className="identify-flow__choice-hint">{b.keyFeature}</span>
              </button>
            ))}
          </div>
          <button className="identify-flow__back" onClick={() => setStep(1)} type="button">
            ← 髪型の選択に戻る
          </button>
        </div>
      )}

      {step === 3 && tier && buddha && (
        <div className="identify-flow__panel identify-flow__result">
          <div className="identify-flow__result-header">
            <span className="identify-flow__tier-badge">{tier.name}</span>
            <h3 className="identify-flow__result-name">{buddha.name}</h3>
            <span className="identify-flow__result-reading">{buddha.reading}</span>
          </div>
          <p className="identify-flow__result-feature"><strong>決め手：</strong>{buddha.keyFeature}</p>
          <p className="identify-flow__result-desc">{buddha.description}</p>
          {buddha.mudraId && mudraById(buddha.mudraId) && (
            <p className="identify-flow__result-extra">
              印相：{mudraById(buddha.mudraId)!.name}（{mudraById(buddha.mudraId)!.shape}）
            </p>
          )}
          {buddha.heldObjectId && heldObjectById(buddha.heldObjectId) && (
            <p className="identify-flow__result-extra">
              持物：{heldObjectById(buddha.heldObjectId)!.name}（{heldObjectById(buddha.heldObjectId)!.meaning}）
            </p>
          )}
          <div className="identify-flow__result-actions">
            <button className="identify-flow__back" onClick={() => setStep(2)} type="button">
              ← 候補を選び直す
            </button>
            <button className="identify-flow__reset" onClick={reset} type="button">
              最初からやり直す
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
