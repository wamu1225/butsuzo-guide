// src/data/buddhas.ts — 各階層の代表的な仏（判定ツールの絞り込み先）
// 出典検証済みの尊格のみを収録。文殊・弥勒・弁才天など図像の細部が
// 博物館・寺公式で未確認の尊格は、裏取りが済むまで収録しない
// （reports/butsuzo-guide.md 「★一部出典不明」注記に従う）。
// 愛染明王は2026-09-19にWebSearchで文化遺産オンライン（bunka.go.jp）・Wikipedia等
// 複数の一次・準一次情報を突合し検証済みのため収録した（O-3-25対応）。

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
    keyFeature: '施無畏印・与願印、または法界定印・転法輪印を結ぶ',
    description:
      '仏教の開祖である釈迦の悟った姿。装飾のない衲衣一枚をまとい、螺髪と肉髻を持つ、如来の基本形。印相は場面によって変わり、説法や安心を与える施無畏印・与願印、瞑想を表す法界定印（親指の先を合わせるが輪はつくらない）などが用いられます。',
  },
  {
    id: 'amida',
    name: '阿弥陀如来',
    reading: 'あみだにょらい',
    tier: 'nyorai',
    mudraId: 'raigo-in',
    keyFeature: '来迎印（右手上げ・左手下げ、各々輪をつくる）が特徴的',
    description:
      '西方極楽浄土の教主。来迎印は、死後に極楽浄土から迎えに来る姿を表したもので、阿弥陀如来を見分ける最も分かりやすい手がかりになります。座像では、両手で輪をつくる阿弥陀定印を結ぶ像もあります。',
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
    keyFeature: '顔がひとつ・腕が2本（一面二臂）。迦楼羅炎（かるらえん）を背負う',
    description:
      '明王の中で最も広く信仰される尊格。大日如来の教令を体現し、怒りの姿で人々の迷いを断ち切ります。燃え盛る炎（迦楼羅炎）を光背とし、右手に剣、左手に羂索（けんさく・縄）を持つことが多く、体色は青または赤とされます。顔と腕がそれぞれひとつ（一面二臂）である点が、多面多臂の明王との見分けの手がかりになります。',
  },
  {
    id: 'aizen',
    name: '愛染明王',
    reading: 'あいぜんみょうおう',
    tier: 'myoo',
    heldObjectId: 'kyuya',
    keyFeature: '全身が赤く、顔に3つの目、腕が6本（三目六臂）。頭上に獅子の冠を戴く',
    description:
      '愛欲や煩悩をそのまま悟りに変えるとされる尊格。全身が真っ赤で、顔に3つの目、6本の腕を持ち（三目六臂）、頭上に獅子の冠を戴く姿は、明王の中でも特に見分けやすい姿です。6本の腕のうち1本に弓矢を持つことが多く、縁結びや厄除けの信仰も集めます。',
  },
  {
    id: 'jikokuten',
    name: '持国天',
    reading: 'じこくてん',
    tier: 'tenbu',
    heldObjectId: 'ken',
    keyFeature: '四天王のうち東方を守り、剣を持つ',
    description:
      '仏の世界を四方から守る四天王のひとり。東方を担当し、剣を持って邪を断ち切ります。東大寺戒壇堂の四天王立像（国宝・奈良時代）では、正面右手前に立ち、剣を構える姿で表されています。',
  },
  {
    id: 'zochoten',
    name: '増長天',
    reading: 'ぞうちょうてん',
    tier: 'tenbu',
    heldObjectId: 'geki',
    keyFeature: '四天王のうち南方を守り、戟（矛の一種）を持つ',
    description:
      '四天王のひとり。南方を担当し、戟（げき・矛の一種）を構えます。恵みを増大させる役割を持つとされ、東大寺戒壇堂の四天王立像では正面左手前に立ちます。',
  },
  {
    id: 'komokuten',
    name: '広目天',
    reading: 'こうもくてん',
    tier: 'tenbu',
    heldObjectId: 'fude-kyokan',
    keyFeature: '四天王のうち西方を守り、筆と経巻（巻物）を持つ',
    description:
      '四天王のひとり。西方を担当し、右手に筆、左手に経巻（巻物）を持つ姿で表されます。人々の善悪の行いを見て記録するとされ、武器ではなく筆記具を持つ点が他の3体との見分けの決め手になります。',
  },
  {
    id: 'tamonten',
    name: '多聞天',
    reading: 'たもんてん',
    tier: 'tenbu',
    heldObjectId: 'houtou',
    keyFeature: '四天王のうち北方を守り、宝塔を捧げ持つ',
    description:
      '四天王のひとり。北方を担当し、仏の教えと財宝を納めた宝塔を手のひらに捧げ持つ姿が最大の特徴です。単独で信仰されるときは毘沙門天（びしゃもんてん）と呼ばれ、七福神のひとりにも数えられます。',
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
