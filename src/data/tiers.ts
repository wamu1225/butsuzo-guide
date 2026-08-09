// src/data/tiers.ts — 仏像の4階層（如来・菩薩・明王・天部）の基礎データ
// 出典：東京国立博物館・京都国立博物館・奈良国立博物館・文化庁の公開情報（reports/butsuzo-guide.md 参照）

export type TierId = 'nyorai' | 'bosatsu' | 'myoo' | 'tenbu';

export interface Tier {
  id: TierId;
  name: string;
  reading: string;
  position: string;
  role: string;
  visualSummary: string;
  origin: string;
  hairstyle: string;
  hairstyleShort: string;
  ornament: string;
  ornamentShort: string;
  expression: string;
  expressionShort: string;
  clothing: string;
  clothingShort: string;
  pedestal: string;
}

export const tiers: Tier[] = [
  {
    id: 'nyorai',
    name: '如来',
    reading: 'にょらい',
    position: '悟りを開いた最高位の仏',
    role: '真理を説き、人々を彼岸（悟りの境地）へ導く',
    visualSummary: '螺髪と肉髻を持ち、装飾を一切つけない質素な姿',
    origin: '出家して修行した後の釈迦の姿がモデル',
    hairstyle: '螺髪（らほつ・巻き貝状の髪）と肉髻（頭頂の盛り上がり）',
    hairstyleShort: '螺髪＋肉髻',
    ornament: '装身具は一切なし。悟りを開いた者は世俗の飾りを必要としないため',
    ornamentShort: 'なし',
    expression: '穏和な慈悲相。半眼（薄く目を開いた瞑想の表情）',
    expressionShort: '穏和・半眼',
    clothing: '衲衣（のうえ）1枚のみ。出家者の質素な衣',
    clothingShort: '衲衣1枚',
    pedestal: '蓮華座に乗り、頭光・身光を負う',
  },
  {
    id: 'bosatsu',
    name: '菩薩',
    reading: 'ぼさつ',
    position: '悟りを目指しながら人々を救う段階の仏',
    role: '現世の人々に直接手を差し伸べる',
    visualSummary: '宝冠・瓔珞など華麗な装飾をまとった気品ある姿',
    origin: '出家する前、王子だった頃の釈迦の姿がモデル',
    hairstyle: '宝髻（ほうけい・高く結い上げた髪）に宝冠を戴く',
    hairstyleShort: '宝髻＋宝冠',
    ornament: '宝冠・瓔珞（ようらく・胸飾り）・臂釧腕釧（ひせんわんせん・腕輪）など華麗な装身具',
    ornamentShort: '宝冠・瓔珞・腕釧',
    expression: '穏和な微笑',
    expressionShort: '穏和・微笑',
    clothing: '条帛（じょうはく）・天衣（てんね）・裳（も）を重ねた貴人風の衣',
    clothingShort: '条帛・天衣・裳',
    pedestal: '蓮華座に乗り、頭光・身光を負う',
  },
  {
    id: 'myoo',
    name: '明王',
    reading: 'みょうおう',
    position: '大日如来の教えを体現する仏',
    role: '言葉で導けない者を、怒りの姿で強く戒め、教え導く（教令輪身）',
    visualSummary: '逆立つ炎髪と忿怒の形相、燃え盛る光背',
    origin: '密教の教理の中で確立された尊格',
    hairstyle: '逆立つ炎髪（かえんぱつ）',
    hairstyleShort: '炎髪',
    ornament: '像により異なる（詳細は個別ページで扱う）',
    ornamentShort: '像により異なる',
    expression: '忿怒相（ふんぬそう）。牙をむき目を見開く',
    expressionShort: '忿怒・牙',
    clothing: '像により異なる（詳細は個別ページで扱う）',
    clothingShort: '像により異なる',
    pedestal: '岩座や火炎光背（迦楼羅炎など）を負うことが多い',
  },
  {
    id: 'tenbu',
    name: '天部',
    reading: 'てんぶ',
    position: '仏の世界と教えを守る護法神',
    role: '聖域を守り、信仰する者に現世利益を与える',
    visualSummary: '甲冑をまとった武将姿、または天女・貴族風の姿',
    origin: '古代インドの神々が仏教に帰依し、守護神として取り込まれた',
    hairstyle: '髻（もとどり）・天冠台・兜など、姿によって異なる',
    hairstyleShort: '髻・天冠台・兜',
    ornament: '首飾り・腕輪・帯など',
    ornamentShort: '首飾り・腕輪・帯',
    expression: '武人の姿は忿怒相、貴顕の姿は穏和相と、役割によって分かれる',
    expressionShort: '忿怒（武人）／穏和（貴顕）',
    clothing: '甲冑、または唐風の衣',
    clothingShort: '甲冑／唐風の衣',
    pedestal: '邪鬼を踏みつける・岩座・敷物など',
  },
];

export const tierById = (id: TierId): Tier => tiers.find((t) => t.id === id)!;
