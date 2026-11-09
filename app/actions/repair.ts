"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, refresh } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { repairRequests } from "@/db/schema";
import { thaiNow } from "@/app/lib/time";
import { PRIORITIES, STATUSES } from "@/app/lib/constants";

export type RepairFormState = {
  error?: string;
  success?: string;
} | null;

const VALID_STATUSES: Set<string> = new Set(STATUSES.map((s) => s.value));
const VALID_PRIORITIES: Set<string> = new Set(PRIORITIES.map((p) => p.value));

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

// เลขใบงาน เช่น RP-20261109-8F3K
function newTicketCode() {
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RP-${date}-${rand}`;
}

export async function createRepair(
  _prevState: RepairFormState,
  formData: FormData
): Promise<RepairFormState> {
  const title = field(formData, "title");
  const category = field(formData, "category");
  const location = field(formData, "location");
  const priority = field(formData, "priority") || "normal";
  const firstname = field(formData, "firstname");
  const lastname = field(formData, "lastname");
  const email = field(formData, "email");
  const lineId = field(formData, "line_id");
  const description = field(formData, "description");

  if (!title || !firstname || !lastname || !email || !lineId || !location) {
    return { error: "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน" };
  }
  if (!VALID_PRIORITIES.has(priority)) {
    return { error: "ระดับความสำคัญไม่ถูกต้อง" };
  }

  const ticketCode = newTicketCode();
  const now = thaiNow();

  try {
    await db.insert(repairRequests).values({
      ticketCode,
      title,
      category: category || "other",
      location,
      priority,
      status: "pending",
      firstname,
      lastname,
      email,
      lineId,
      description,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง" };
  }

  revalidatePath("/admin");
  redirect(`/track?code=${ticketCode}&created=1`);
}

export async function updateRepair(
  _prevState: RepairFormState,
  formData: FormData
): Promise<RepairFormState> {
  const id = Number(formData.get("id"));
  const status = field(formData, "status");
  const priority = field(formData, "priority");
  const adminNote = field(formData, "admin_note");
  const assignedTechRaw = field(formData, "assigned_tech");
  const assignedTechId = assignedTechRaw ? Number(assignedTechRaw) : null;

  if (!Number.isInteger(id) || id <= 0) {
    return { error: "ไม่พบรายการที่ต้องการแก้ไข" };
  }
  if (!VALID_STATUSES.has(status) || !VALID_PRIORITIES.has(priority)) {
    return { error: "ข้อมูลสถานะหรือความสำคัญไม่ถูกต้อง" };
  }
  if (assignedTechId !== null && !Number.isInteger(assignedTechId)) {
    return { error: "ข้อมูลช่างผู้รับผิดชอบไม่ถูกต้อง" };
  }

  try {
    await db
      .update(repairRequests)
      .set({ status, priority, adminNote, assignedTechId, updatedAt: thaiNow() })
      .where(eq(repairRequests.id, id));
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง" };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
  revalidatePath("/track");
  refresh();
  return { success: "บันทึกการอัปเดตเรียบร้อยแล้ว" };
}

export async function deleteRepair(
  _prevState: RepairFormState,
  formData: FormData
): Promise<RepairFormState> {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return { error: "ไม่พบรายการที่ต้องการลบ" };
  }

  try {
    await db.delete(repairRequests).where(eq(repairRequests.id, id));
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "เกิดข้อผิดพลาดในการลบข้อมูล กรุณาลองใหม่อีกครั้ง" };
  }

  revalidatePath("/admin");
  revalidatePath("/track");
  redirect("/admin");
}
