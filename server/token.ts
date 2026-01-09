import jwt from "jsonwebtoken";

const SECRET = "超安全な秘密鍵"; // GitHub公開時はenvで管理

interface JoinTokenPayload {
  userId: string;
  serverId: string;
  role: "USER" | "ADMIN";
  exp: number;
}

export function createJoinToken(payload: JoinTokenPayload): string {
  return jwt.sign(payload, SECRET);
}

export function verifyToken(token: string): JoinTokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as JoinTokenPayload;
  } catch {
    return null;
  }
}
