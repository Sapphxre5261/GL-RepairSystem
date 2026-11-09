import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, technicians } from "@/db/schema";

export const SESSION_COOKIE = "fixmaster_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 วัน

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export async function createSession(techId: number) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  await db.insert(sessions).values({ token, techId, expiresAt });
  return { token, expiresAt };
}

// อ่าน session จาก cookie แล้วคืนข้อมูลช่าง (null = ยังไม่ล็อกอิน / หมดอายุ)
export async function getCurrentTech() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await db
    .select({
      id: technicians.id,
      username: technicians.username,
      name: technicians.name,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(technicians, eq(sessions.techId, technicians.id))
    .where(eq(sessions.token, token))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  if (row.expiresAt < new Date().toISOString()) {
    await db.delete(sessions).where(eq(sessions.token, token));
    return null;
  }

  return { id: row.id, username: row.username, name: row.name };
}

export async function destroySession(token: string) {
  await db.delete(sessions).where(eq(sessions.token, token));
}
