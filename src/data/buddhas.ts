// src/data/buddhas.ts — 各階層の代表的な仏（判定ツールの絞り込み先）
// 出典検証済みの尊格のみを収録。文殊・弥勒・愛染・弁才天など図像の細部が
// 博物館・寺公式で未確認の尊格は、裏取りが済むまで収録しない
// （reports/butsuzo-guide.md 「★一部出典不明」注記に従う）。

import type { TierId } from './tiers';

export interface RepresentativeBuddha {
  id: string;
  name: string;
  reading: string;
  tier: TierId;
  mudraId?: string;
  heldObjectId?: string;
  keyFeature: string;
  description: string;
}

export const representativeBuddhas: RepresentativeBuddha[] = [
  {
    id: 'shaka',
    name: '釈迦如来',
    reading: 'しゃかにょらい',
    tier: 'nyorai',
    mudraId: 'semui-in',
    keyFeature: '施無畏印・与願印、または定印・転法輪印を結ぶ',
    description:
      '仏教の開祖である釈迦の悟った姿。装飾のない衲衣一枚をまとい、螺髪と肉髻を持つ、如来の基本形。印相は場面によって変わり、説法や安心を与える施無畏印・与願印、瞑想を表す定印などが用いられます。',
  },
  {
    id: 'amida',
    name: '阿弥陀如来',
    reading: 'あみだにょらい',
    tier: 'nyorai',
    mudraId: 'raigo-in',
    keyFeature: '来迎印（右手上げ・左手下げ、各々輪をつくる）が特徴的',
    description:
      '西方極楽浄土の教主。来迎印は、死後に極楽浄土から迎えに来る姿を表したもので、阿弥陀如来を見分ける最も分かりやすい手がかりになります。定印を結ぶ像もあります。',
  },
  {
    id: 'yakushi',
    name: '薬師如来',
    reading: 'やくしにょらい',
    tier: 'nyorai',
    heldObjectId: 'yakko',
    keyFeature: '左手に薬壺（やっこ）を持つ',
    description:
      '病や苦しみを癒す如来。左手に薬の入った壺（薬壺）を持つ姿で表されることが多く、他の如来との見分けの決定打になります。',
  },
  {
    id: 'dainichi',
    name: '大日如来',
    reading: 'だいにちにょらい',
    tier: 'nyorai',
    mudraId: 'chiken-in',
    keyFeature: '如来なのに宝冠などの装飾をまとう例外。智拳印（金剛界）が特徴的',
    description:
      '密教における宇宙の中心・最高位の仏。実在した釈迦がモデルの如来とは異なり、宇宙そのものを象徴する存在のため、如来でありながら五智宝冠などの装飾をまとう例外的な姿を持ちます。金剛界では智拳印を結びます。',
  },
  {
    id: 'kannon',
    name: '観音菩薩',
    reading: 'かんのんぼさつ',
    tier: 'bosatsu',
    heldObjectId: 'renge',
    keyFeature: '宝冠の正面に阿弥陀の化仏（けぶつ）を戴く',
    description:
      '人々の求めに応じて姿を変え、あらゆる者を漏れなく救うとされる菩薩。十一面観音・千手観音など多くの変化身を持ちます。宝冠の正面に小さな阿弥陀如来（化仏）を戴く点が、他の菩薩との見分けの手がかりになります。',
  },
  {
    id: 'jizo',
    name: '地蔵菩薩',
    reading: 'じぞうぼさつ',
    tier: 'bosatsu',
    heldObjectId: 'shakujou',
    keyFeature: '菩薩なのに宝冠を着けず、僧侶と同じ丸刈りの姿（僧形）',
    description:
      '六道（地獄・餓鬼・畜生・修羅・人・天）を巡り歩き、苦しむ人々を救うとされる菩薩。他の菩薩が持つ宝冠を捨て、僧侶と同じ丸刈りの姿（僧形）をとる点が最大の特徴。右手に錫杖、左手に宝珠を持つことが多くあります。',
  },
  {
    id: 'fugen',
    name: '普賢菩薩',
    reading: 'ふげんぼさつ',
    tier: 'bosatsu',
    keyFeature: '六本の牙を持つ白い象（六牙の白象）に乗る',
    description:
      '実践や慈悲を象徴する菩薩。六本の牙を持つ白象の背に乗る姿で表され、乗り物の姿そのものが他の菩薩との明確な見分けの手がかりになります。',
  },
  {
    id: 'fudo',
    name: '不動明王',
    reading: 'ふどうみょうおう',
    tier: 'myoo',
    keyFeature: '忿怒相・炎髪、迦楼羅炎（かるらえん）を背負い、青または赤の体色',
    description:
      '明王の中で最も広く信仰される尊格。大日如来の教令を体現し、怒りの姿で人々の迷いを断ち切ります。燃え盛る炎（迦楼羅炎）を光背とし、右手に剣、左手に羂索（けんさく・縄）を持つことが多くあります。',
  },
  {
    id: 'shitenno',
    name: '四天王',
    reading: 'してんのう',
    tier: 'tenbu',
    keyFeature: '甲冑をまとい、邪鬼を踏みつけて立つ武将の姿',
    description:
      '仏の世界を四方から守る4体の武神（持国天・増長天・広目天・多聞天）。甲冑姿で武器を構え、足元に邪鬼を踏みつける姿は、天部の中でも特に見分けやすい姿です。',
  },
  {
    id: 'kongorikishi',
    name: '金剛力士',
    reading: 'こんごうりきし',
    tier: 'tenbu',
    keyFeature: '上半身裸の筋骨隆々とした姿。寺の門の左右に一対で立つ',
    description:
      '寺院の門（仁王門）の左右に安置され、仏法を守る一対の守護神（阿形・吽形）。甲冑をまとう他の天部とは異なり、上半身裸で筋肉を誇張した姿が特徴。',
  },
];

export const buddhaById = (id: string): RepresentativeBuddha | undefined =>
  representativeBuddhas.find((b) => b.id === id);

export const buddhasByTier = (tier: TierId): RepresentativeBuddha[] =>
  representativeBuddhas.filter((b) => b.tier === tier);
