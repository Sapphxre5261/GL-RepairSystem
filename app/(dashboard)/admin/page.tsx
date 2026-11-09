import Link from "next/link";
import { Suspense } from "react";
import StatusBadge from "@/app/components/StatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { listRepairs, listTechnicians, repairStats, techNameMap } from "@/app/lib/repairs";
import { categoryMeta, STATUSES } from "@/app/lib/constants";
import { formatThaiDateTime } from "@/app/lib/time";

const FILTER_TABS = [
  { value: "all", label: "ทั้งหมด" },
  ...STATUSES.map((s) => ({ value: s.value, label: s.label })),
];

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

function StatCard({
  label,
  count,
  accent,
}: {
  label: string;
  count: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent}`}>{count}</p>
    </div>
  );
}

async function AdminContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "all";
  const q = typeof params.q === "string" ? params.q.trim() : "";

  const [stats, repairs, techs] = await Promise.all([
    repairStats(),
    listRepairs({ status, q }),
    listTechnicians(),
  ]);
  const techNames = techNameMap(techs);

  const tabHref = (value: string) =>
    value === "all" ? "/admin" : `/admin?status=${value}`;

  return (
    <div className="space-y-6">
      {/* สถิติภาพรวม */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="ใบงานทั้งหมด" count={stats.total} accent="text-zinc-900" />
        <StatCard label="รอดำเนินการ" count={stats.pending} accent="text-amber-600" />
        <StatCard
          label="กำลังดำเนินการ"
          count={stats.in_progress}
          accent="text-blue-600"
        />
        <StatCard
          label="เสร็จสิ้น"
          count={stats.completed}
          accent="text-emerald-600"
        />
        <StatCard
          label="ยกเลิก"
          count={stats.cancelled}
          accent="text-zinc-500"
        />
      </div>

      {/* ตัวกรองสถานะ + ค้นหา */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const active = status === tab.value || (!status && tab.value === "all");
            return (
              <Link
                key={tab.value}
                href={tabHref(tab.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-zinc-600 border-zinc-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <form action="/admin" method="get" className="flex gap-2">
          {status !== "all" && status !== "" && (
            <input type="hidden" name="status" value={status} />
          )}
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="ค้นหาใบงาน, ชื่อ, สถานที่..."
            className={`${inputClass} lg:w-72`}
          />
          <button
            type="submit"
            className="shrink-0 px-5 py-2 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            ค้นหา
          </button>
        </form>
      </div>

      {/* ตารางใบงาน */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        {repairs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-3xl mb-3">📭</div>
            <p className="font-medium text-zinc-700">ไม่พบใบงาน</p>
            <p className="text-sm text-zinc-500 mt-1">
              ลองเปลี่ยนตัวกรองหรือคำค้นหา
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/60 text-left text-xs uppercase tracking-wider text-zinc-500">
                  <th className="px-5 py-3 font-medium">ใบงาน</th>
                  <th className="px-5 py-3 font-medium">เรื่อง</th>
                  <th className="px-5 py-3 font-medium">หมวดหมู่</th>
                  <th className="px-5 py-3 font-medium">ผู้แจ้ง</th>
                  <th className="px-5 py-3 font-medium">ช่าง</th>
                  <th className="px-5 py-3 font-medium">ความสำคัญ</th>
                  <th className="px-5 py-3 font-medium">สถานะ</th>
                  <th className="px-5 py-3 font-medium">แจ้งเมื่อ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {repairs.map((r) => {
                  const category = categoryMeta(r.category);
                  return (
                    <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-zinc-500 whitespace-nowrap">
                        {r.ticketCode}
                      </td>
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/${r.id}`}
                          className="font-medium text-zinc-900 hover:text-blue-600 transition-colors"
                        >
                          {r.title}
                        </Link>
                        {r.location && (
                          <p className="text-xs text-zinc-400 mt-0.5">
                            📍 {r.location}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3 text-zinc-600 whitespace-nowrap">
                        {category.icon} {category.label}
                      </td>
                      <td className="px-5 py-3 text-zinc-600 whitespace-nowrap">
                        {r.firstname} {r.lastname}
                      </td>
                      <td className="px-5 py-3 text-zinc-600 whitespace-nowrap">
                        {r.assignedTechId !== null
                          ? (techNames.get(r.assignedTechId) ?? "-")
                          : "-"}
                      </td>
                      <td className="px-5 py-3">
                        <PriorityBadge priority={r.priority} />
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500 whitespace-nowrap">
                        {formatThaiDateTime(r.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminFallback() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl border border-zinc-200 bg-white animate-pulse"
          />
        ))}
      </div>
      <div className="h-72 rounded-2xl border border-zinc-200 bg-white animate-pulse" />
    </div>
  );
}

export default function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="min-h-full bg-zinc-50 pb-16">
      <main className="max-w-7xl mx-auto px-6 pt-10 w-full space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Admin Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2">
              จัดการงานซ่อม
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              ภาพรวมใบงานทั้งหมด กรองตามสถานะ และอัปเดตงานให้ทีมช่าง
            </p>
          </div>
          <Link
            href="/req-repair"
            className="rounded-full bg-blue-600 text-white px-5 py-2 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            + สร้างใบงานใหม่
          </Link>
        </div>

        <Suspense fallback={<AdminFallback />}>
          <AdminContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
