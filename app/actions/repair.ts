"use server";

import {db} from "../../index"

import { repairRequests } from "@/db/schema";
import { redirect } from "next/navigation";

function getThaiTimeString() {
  const now = new Date();
  
  // ใช้ locale 'sv-SE' เพื่อให้ได้รูปแบบ YYYY-MM-DD HH:mm:ss โดยอัตโนมัติ
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
}

console.log(getThaiTimeString()); 
// ผลลัพธ์จะได้ เช่น: "2026-11-09 16:14:00"

export async function createRepair(formData: FormData) {
  const title = formData.get("title") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const lineId = formData.get("line_id") as string;
  const description = formData.get("description") as string;
  const createdAt = getThaiTimeString();

  try {
    // บันทึกลง SQLite
    await db.insert(repairRequests).values({
      title,
      firstname,
      lastname,
      email,
      lineId,
      description,
      createdAt,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Can't insert");
  }

  redirect("/");
}