// src/data/mudras.ts — 印相（いんそう）：手の形とその意味
// 出典：文化庁・京都国立博物館の公開情報（reports/butsuzo-guide.md 参照）

export interface Mudra {
  id: string;
  name: string;
  reading: string;
  shape: string;
  meaning: string;
  buddhas: string;
}

export const mudras: Mudra[] = [
  {
    id: 'jouin',
    name: '定印',
    reading: 'じょういん',
    shape: '腹の前で両手を重ね、親指と人差し指で輪をつくる',
    meaning: '瞑想・精神統一を表す',
    buddhas: '釈迦如来・阿弥陀如来',
  },
  {
    id: 'semui-in',
    name: '施無畏印',
    reading: 'せむいいん',
    shape: '右手を上げ、手のひらを外に向ける',
    meaning: '恐れを取り除き、安心させる',
    buddhas: '釈迦如来・薬師如来',
  },
  {
    id: 'yogan-in',
    name: '与願印',
    reading: 'よがんいん',
    shape: '左手を下げ、手のひらを前に向ける',
    meaning: '願いを聞き入れ、恵みを与える',
    buddhas: '釈迦如来・薬師如来',
  },
  {
    id: 'tenborin-in',
    name: '転法輪印',
    reading: 'てんぼうりんいん',
    shape: '胸の前で両手の指を組み合わせ、輪をつくる',
    meaning: '初めての説法（初転法輪）を表す',
    buddhas: '釈迦如来・一部の如来',
  },
  {
    id: 'raigo-in',
    name: '来迎印',
    reading: 'らいごういん',
    shape: '右手を上げ左手を下げ、それぞれで輪をつくる',
    meaning: '極楽浄土から迎えに来る姿を表す',
    buddhas: '阿弥陀如来',
  },
  {
    id: 'chiken-in',
    name: '智拳印',
    reading: 'ちけんいん',
    shape: '胸の前で右手が左手の人差し指を握る',
    meaning: '最高の智慧を表す',
    buddhas: '大日如来（金剛界）',
  },
];

export const mudraById = (id: string): Mudra | undefined => mudras.find((m) => m.id === id);
