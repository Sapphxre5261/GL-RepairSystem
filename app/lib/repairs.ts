import { and, desc, eq, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { repairRequests, technicians } from "@/db/schema";

export type Repair = typeof repairRequests.$inferSelect;

export async function listRepairs(opts: { status?: string; q?: string } = {}) {
  const conditions: (SQL | undefined)[] = [];

  if (opts.status && opts.status !== "all") {
    conditions.push(eq(repairRequests.status, opts.status));
  }

  if (opts.q) {
    const pattern = `%${opts.q}%`;
    conditions.push(
      or(
        like(repairRequests.title, pattern),
        like(repairRequests.ticketCode, pattern),
        like(repairRequests.firstname, pattern),
        like(repairRequests.lastname, pattern),
        like(repairRequests.location, pattern)
      )
    );
  }

  return db
    .select()
    .from(repairRequests)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(repairRequests.id));
}

export async function getRepairById(id: number) {
  const rows = await db
    .select()
    .from(repairRequests)
    .where(eq(repairRequests.id, id))
    .limit(1);
  return rows[0] ?? null;
}

// ใช้ในหน้าติดตามสถานะ — ค้นหาจากเลขใบงาน, อีเมล หรือช่องทางติดต่อ
export async function findRepairsByQuery(query: string) {
  const pattern = `%${query}%`;
  return db
    .select()
    .from(repairRequests)
    .where(
      or(
        like(repairRequests.ticketCode, pattern),
        like(repairRequests.email, pattern),
        like(repairRequests.lineId, pattern),
        like(repairRequests.firstname, pattern),
        like(repairRequests.lastname, pattern)
      )
    )
    .orderBy(desc(repairRequests.id))
    .limit(20);
}

export async function listTechnicians() {
  return db
    .select({ id: technicians.id, name: technicians.name })
    .from(technicians)
    .orderBy(technicians.id);
}

export function techNameMap(techs: { id: number; name: string }[]) {
  return new Map(techs.map((t) => [t.id, t.name]));
}

export async function repairStats() {
  const rows = await db
    .select({
      status: repairRequests.status,
      count: sql<number>`count(*)`,
    })
    .from(repairRequests)
    .groupBy(repairRequests.status);

  const stats = {
    pending: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
    total: 0,
  };
  for (const row of rows) {
    if (row.status in stats) {
      stats[row.status as keyof Omit<typeof stats, "total">] = row.count;
    }
    stats.total += row.count;
  }
  return stats;
}
