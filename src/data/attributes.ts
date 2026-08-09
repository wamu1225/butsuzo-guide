// src/data/attributes.ts — 持物（じもつ）：手に持つ道具とその意味
// 出典：文化財関連データベース・奈良国立博物館の公開情報（reports/butsuzo-guide.md 参照）

export interface HeldObject {
  id: string;
  name: string;
  meaning: string;
  buddhas: string;
}

export const heldObjects: HeldObject[] = [
  {
    id: 'ken-kyoten',
    name: '剣・経典',
    meaning: '智慧で迷いを断ち切り、教えを授ける',
    buddhas: '文殊菩薩',
  },
  {
    id: 'renge',
    name: '蓮華',
    meaning: '清浄な悟りの境地を表す',
    buddhas: '観音菩薩など',
  },
  {
    id: 'suibyou',
    name: '水瓶',
    meaning: '清らかな水で人々の渇きを潤す',
    buddhas: '観音菩薩など',
  },
  {
    id: 'houju',
    name: '宝珠',
    meaning: '願いをかなえる珠。人々に恵みを与える',
    buddhas: '地蔵菩薩など',
  },
  {
    id: 'shakujou',
    name: '錫杖',
    meaning: '杖の頭の輪が音を立てて修行者の来訪を知らせる。地獄の衆生を救う象徴',
    buddhas: '地蔵菩薩',
  },
  {
    id: 'yakko',
    name: '薬壺',
    meaning: '病を癒す薬を納める',
    buddhas: '薬師如来',
  },
];

export const heldObjectById = (id: string): HeldObject | undefined =>
  heldObjects.find((o) => o.id === id);
