import { Suspense } from "react";
import StatusBadge from "@/app/components/StatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { findRepairsByQuery, listTechnicians, techNameMap, type Repair } from "@/app/lib/repairs";
import { categoryMeta } from "@/app/lib/constants";
import { formatThaiDateTime } from "@/app/lib/time";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

const TIMELINE_STEPS = [
  { key: "created", label: "ส่งเรื่องแจ้งซ่อม", desc: "ระบบได้รับเรื่องของคุณแล้ว" },
  { key: "pending", label: "รอดำเนินการ", desc: "อยู่ในคิวรอทีมช่างรับงาน" },
  { key: "in_progress", label: "กำลังดำเนินการ", desc: "ทีมช่างกำลังเข้าตรวจสอบ/ซ่อมแซม" },
  { key: "completed", label: "เสร็จสิ้น", desc: "งานซ่อมเสร็จเรียบร้อยแล้ว" },
] as const;

function StatusTimeline({ repair }: { repair: Repair }) {
  const cancelled = repair.status === "cancelled";
  const currentIndex =
    repair.status === "pending"
      ? 1
      : repair.status === "in_progress"
        ? 2
        : repair.status === "completed"
          ? 3
          : 1;

  return (
    <ol className="space-y-0">
      {TIMELINE_STEPS.map((step, i) => {
        const reached = !cancelled && i <= currentIndex;
        const isLast = i === TIMELINE_STEPS.length - 1;
        return (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`mt-1 h-3 w-3 rounded-full border-2 ${
                  reached
                    ? "border-blue-600 bg-blue-600"
                    : "border-zinc-300 bg-white"
                }`}
              />
              {!isLast && (
                <span
                  className={`w-px flex-1 ${reached && i < currentIndex ? "bg-blue-500" : "bg-zinc-200"}`}
                />
              )}
            </div>
            <div className={isLast ? "" : "pb-5"}>
              <p
                className={`text-sm font-medium ${reached ? "text-zinc-900" : "text-zinc-400"}`}
              >
                {step.label}
                {cancelled && step.key === "pending" && (
                  <span className="ml-2 text-zinc-400">(ยกเลิก)</span>
                )}
              </p>
              <p className={`text-xs ${reached ? "text-zinc-500" : "text-zinc-400"}`}>
                {step.desc}
              </p>
            </div>
          </li>
        );
      })}
      {cancelled && (
        <li className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full border-2 border-zinc-400 bg-zinc-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-700">ยกเลิก</p>
            <p className="text-xs text-zinc-500">ใบงานนี้ถูกยกเลิกโดยทีมงาน</p>
          </div>
        </li>
      )}
    </ol>
  );
}

function RepairCard({
  repair,
  techNames,
}: {
  repair: Repair;
  techNames: Map<number, string>;
}) {
  const category = categoryMeta(repair.category);
  const assignedName =
    repair.assignedTechId !== null
      ? techNames.get(repair.assignedTechId)
      : undefined;
  return (
    <article className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-mono text-zinc-400">{repair.ticketCode}</p>
          <h3 className="text-lg font-semibold text-zinc-900 mt-0.5">
            {repair.title}
          </h3>
        </div>
        <StatusBadge status={repair.status} />
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <dl className="space-y-3 text-sm">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-500">หมวดหมู่</dt>
            <dd className="text-zinc-900">
              {category.icon} {category.label}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-500">สถานที่</dt>
            <dd className="text-zinc-900">{repair.location || "-"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-500">ความสำคัญ</dt>
            <dd>
              <PriorityBadge priority={repair.priority} />
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-500">ผู้แจ้ง</dt>
            <dd className="text-zinc-900">
              {repair.firstname} {repair.lastname}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-zinc-500">แจ้งเมื่อ</dt>
            <dd className="text-zinc-900">
              {formatThaiDateTime(repair.createdAt)}
            </dd>
          </div>
          {assignedName && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-zinc-500">ช่างที่รับผิดชอบ</dt>
              <dd className="text-zinc-900">{assignedName}</dd>
            </div>
          )}
          {repair.description && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-zinc-500">รายละเอียด</dt>
              <dd className="text-zinc-900 whitespace-pre-line">
                {repair.description}
              </dd>
            </div>
          )}
          {repair.adminNote && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">
                หมายเหตุจากทีมช่าง
              </p>
              <p className="text-sm text-blue-900 whitespace-pre-line">
                {repair.adminNote}
              </p>
            </div>
          )}
        </dl>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            ความคืบหน้า
          </p>
          <StatusTimeline repair={repair} />
        </div>
      </div>
    </article>
  );
}

async function TrackResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code, created } = await searchParams;
  const query = typeof code === "string" ? code.trim() : "";
  const [repairs, techs] = await Promise.all([
    query ? findRepairsByQuery(query) : Promise.resolve([]),
    listTechnicians(),
  ]);
  const techNames = techNameMap(techs);

  return (
    <div className="space-y-6">
      {created === "1" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <p className="font-semibold text-emerald-800">
            ส่งเรื่องแจ้งซ่อมเรียบร้อยแล้ว
          </p>
          <p className="text-sm text-emerald-700 mt-0.5">
            เลขใบงานของคุณคือ{" "}
            <span className="font-mono font-bold">{query}</span> —
            เก็บเลขนี้ไว้สำหรับติดตามสถานะ
          </p>
        </div>
      )}

      {query === "" ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
          <div className="text-3xl mb-3">🔍</div>
          <p className="font-medium text-zinc-700">ค้นหาใบงานของคุณ</p>
          <p className="text-sm text-zinc-500 mt-1">
            กรอกเลขใบงาน (เช่น RP-20261109-XXXX) อีเมล หรือช่องทางติดต่อที่ใช้แจ้ง
          </p>
        </div>
      ) : repairs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
          <div className="text-3xl mb-3">📭</div>
          <p className="font-medium text-zinc-700">
            ไม่พบใบงานที่ตรงกับ “{query}”
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            ตรวจสอบเลขใบงานหรืออีเมลอีกครั้ง
          </p>
        </div>
      ) : (
        repairs.map((repair) => (
          <RepairCard key={repair.id} repair={repair} techNames={techNames} />
        ))
      )}
    </div>
  );
}

function TrackFallback() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center text-sm text-zinc-500">
      กำลังค้นหาข้อมูล...
    </div>
  );
}

export default function TrackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="min-h-full bg-zinc-50 pb-16">
      <main className="max-w-3xl mx-auto px-6 pt-10 w-full space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2">
            ติดตามสถานะงานซ่อม
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            ค้นหาด้วยเลขใบงาน อีเมล หรือช่องทางติดต่อที่ระบุไว้ตอนแจ้ง
          </p>
        </div>

        <form
          action="/track"
          method="get"
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            name="code"
            placeholder="เช่น RP-20261109-XXXX หรือ example@email.com"
            className={inputClass}
          />
          <button
            type="submit"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            ค้นหา
          </button>
        </form>

        <Suspense fallback={<TrackFallback />}>
          <TrackResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
