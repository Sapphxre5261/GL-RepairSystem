"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { technicians } from "@/db/schema";
import {
  SESSION_COOKIE,
  createSession,
  destroySession,
  verifyPassword,
  hashPassword,
} from "@/app/lib/auth";

export type AuthFormState = { error?: string } | null;

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" };
  }

  const rows = await db
    .select()
    .from(technicians)
    .where(eq(technicians.username, username))
    .limit(1);
  const tech = rows[0];

  // เทียบ hash เสมอ (กันการเดาชื่อผู้ใช้จากเวลาตอบกลับ)
  const storedHash = tech?.passwordHash ?? hashPassword("dummy");
  if (!tech || !verifyPassword(password, storedHash)) {
    return { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }

  const session = await createSession(tech.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await destroySession(token);
  }
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
