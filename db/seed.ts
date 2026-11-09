import "dotenv/config";
import { createClient } from "@libsql/client";
import { randomBytes, scryptSync } from "node:crypto";

const client = createClient({ url: process.env.DB_FILE_NAME! });

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const TECHS = [
  { username: "admin", password: "admin123", name: "ช่างหลัก (ผู้ดูแลระบบ)" },
  { username: "somkit", password: "somkit123", name: "สมเกียรติ ใจดี" },
  { username: "wana", password: "wana123", name: "วนา พรหมมา" },
];

async function main() {
  for (const tech of TECHS) {
    await client.execute({
      sql: "INSERT OR IGNORE INTO technicians (username, password_hash, name, created_at) VALUES (?, ?, ?, ?)",
      args: [
        tech.username,
        hashPassword(tech.password),
        tech.name,
        new Date().toISOString(),
      ],
    });
  }

  const result = await client.execute(
    "SELECT id, username, name FROM technicians"
  );
  console.log("Technicians:", JSON.stringify(result.rows, null, 2));
}

main();
