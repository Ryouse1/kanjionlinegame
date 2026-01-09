import express from "express";

export const grade4to6Kanji = [
  "画","海","川","橋","森","光","空","音","力","学","体","気","友","他","花",
  "広","用","点","住","切","駅","図","薬","集","止","広","持","羽","心","走",
  "額","覚","汗","歌","害","改","械","街","漢","感","管","館","起","期",
  "帰","旧","牛","究","吸","宮","球","去","業","居","漁","橋","銀","区",
  "域","育","運","園","延","演","応","恩","我","快","解","階","界","開",
  "各","格","曲","号","根","祭","参"
];

export function setupKanjiAPI(app: express.Express) {
  app.get("/api/random-kanji", (req, res) => {
    const idx = Math.floor(Math.random() * grade4to6Kanji.length);
    res.json({ kanji: grade4to6Kanji[idx] });
  });
}
