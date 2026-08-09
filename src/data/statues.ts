// src/data/statues.ts — 著名な仏像とその所在（指定区分・年代は文化財DB・寺社公式で検証済み）
// 出典：法隆寺公式・中宮寺公式・文化財関連データベース・各寺社公式（reports/butsuzo-guide.md 参照）

import type { TierId } from './tiers';

export interface FamousStatue {
  id: string;
  name: string;
  temple: string;
  designation: string;
  era: string;
  material: string;
  tier: TierId;
  note: string;
}

export const famousStatues: FamousStatue[] = [
  {
    id: 'rushana-todaiji',
    name: '盧舎那仏（奈良の大仏）',
    temple: '東大寺（奈良県奈良市）',
    designation: '国宝',
    era: '奈良時代',
    material: '銅造',
    tier: 'nyorai',
    note: '全宇宙を照らす仏として、国家事業として造立された。像高は約15メートル。',
  },
  {
    id: 'ashura-kofukuji',
    name: '阿修羅像（乾漆八部衆のひとつ）',
    temple: '興福寺（奈良県奈良市）',
    designation: '国宝',
    era: '奈良時代（734年）',
    material: '脱活乾漆造',
    tier: 'tenbu',
    note: '三つの顔と六本の腕（三面六臂）を持つ。仏法を守る八部衆の一体で、少年のような憂いを帯びた表情で知られる。',
  },
  {
    id: 'amida-byodoin',
    name: '阿弥陀如来坐像',
    temple: '平等院鳳凰堂（京都府宇治市）',
    designation: '国宝',
    era: '平安時代（1053年）',
    material: '寄木造・漆箔',
    tier: 'nyorai',
    note: '仏師・定朝（じょうちょう）の作と確実に分かる現存唯一の作品。優美な作風は後世の仏像の規範となった。',
  },
  {
    id: 'senju-sanjusangendo',
    name: '千手観音坐像（中尊）',
    temple: '三十三間堂（京都府京都市）',
    designation: '国宝',
    era: '鎌倉時代',
    material: '寄木造',
    tier: 'bosatsu',
    note: '仏師・湛慶（たんけい）ら慶派による中尊。堂内には等身大の千手観音立像1001体も並ぶ。',
  },
  {
    id: 'dainichi-kongoji',
    name: '大日如来坐像',
    temple: '金剛寺（大阪府河内長野市）',
    designation: '重要文化財',
    era: '平安時代後期',
    material: '木造',
    tier: 'nyorai',
    note: '智拳印を結ぶ、平安後期を代表する大日如来像のひとつ。',
  },
  {
    id: 'godai-kokuzo-toji',
    name: '五大虚空蔵菩薩像',
    temple: '東寺（京都府京都市）',
    designation: '重要文化財',
    era: '唐時代（9世紀）',
    material: '木造',
    tier: 'bosatsu',
    note: '密教の宇宙観を仏像群で表す立体曼荼羅の一部として伝わる、唐で制作された貴重な作例。',
  },
  {
    id: 'shaka-sanzon-horyuji',
    name: '釈迦三尊像',
    temple: '法隆寺 金堂（奈良県生駒郡）',
    designation: '国宝（1951年指定）',
    era: '飛鳥時代（推古23年＝623年）',
    material: '銅造',
    tier: 'nyorai',
    note: '仏師・止利（とり）の作。聖徳太子の等身と伝えられ、光背裏の銘文から制作年が確定している貴重な作例。',
  },
  {
    id: 'hankashi-chuguji',
    name: '菩薩半跏像',
    temple: '中宮寺（奈良県生駒郡）',
    designation: '国宝（1951年6月9日指定）',
    era: '飛鳥時代',
    material: '木造',
    tier: 'bosatsu',
    note: '寺伝では如意輪観音とされるが、片足を組んで頬に指を添える半跏思惟の姿から弥勒菩薩とする説もあり、諸説がある。',
  },
];

export const statueById = (id: string): FamousStatue | undefined =>
  famousStatues.find((s) => s.id === id);
