import express from "express";
import { WebSocketServer } from "ws";
import { setupKanjiAPI } from "./kanji";
import { servers, joinServer } from "./state";
import { verifyToken } from "./token";

const app = express();
const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
setupKanjiAPI(app);

wss.on("connection", (ws, req) => {
  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.type === "JOIN") {
        const payload = verifyToken(data.joinToken);
        if (!payload) return ws.close();
        joinServer(payload.userId, payload.serverId, ws, payload.role);
      }
      if (data.type === "STROKE") {
        // 書き順・二度書きは state.ts でチェック
        // 正常ならサーバー側に蓄積
      }
      if (data.type === "PING") {
        ws.send(JSON.stringify({ type: "PONG", ts: data.ts }));
      }
    } catch { return; }
  });
});

app.listen(3000, () => console.log("HTTP server running on :3000"));
console.log("WebSocket server running on :8080");
