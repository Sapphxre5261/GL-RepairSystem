import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminUpdateForm from "@/app/components/AdminUpdateForm";
import StatusBadge from "@/app/components/StatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { getRepairById, listTechnicians, techNameMap } from "@/app/lib/repairs";
import { categoryMeta } from "@/app/lib/constants";
import { formatThaiDateTime } from "@/app/lib/time";

async function RepairDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [repair, techs] = await Promise.all([
    getRepairById(Number(id)),
    listTechnicians(),
  ]);

  if (!repair) {
    notFound();
  }

  const category = categoryMeta(repair.category);
  const assignedName =
    repair.assignedTechId !== null
      ? (techNameMap(techs).get(repair.assignedTechId) ?? "ไม่ทราบ")
      : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* รายละเอียดใบงาน */}
      <article className="xl:col-span-3 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden self-start">
        <div className="px-6 py-5 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-zinc-400">{repair.ticketCode}</p>
            <h2 className="text-xl font-semibold text-zinc-900 mt-0.5">
              {repair.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={repair.priority} />
            <StatusBadge status={repair.status} />
          </div>
        </div>

        <dl className="px-6 py-5 space-y-3 text-sm">
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">หมวดหมู่</dt>
            <dd className="text-zinc-900">
              {category.icon} {category.label}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">สถานที่</dt>
            <dd className="text-zinc-900">{repair.location || "-"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">ผู้แจ้ง</dt>
            <dd className="text-zinc-900">
              {repair.firstname} {repair.lastname}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">อีเมล</dt>
            <dd className="text-zinc-900">{repair.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">ช่องทางติดต่อ</dt>
            <dd className="text-zinc-900">{repair.lineId}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">ช่างผู้รับผิดชอบ</dt>
            <dd className="text-zinc-900">{assignedName ?? "ยังไม่มอบหมาย"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">แจ้งเมื่อ</dt>
            <dd className="text-zinc-900">
              {formatThaiDateTime(repair.createdAt)}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-28 shrink-0 text-zinc-500">อัปเดตล่าสุด</dt>
            <dd className="text-zinc-900">
              {formatThaiDateTime(repair.updatedAt)}
            </dd>
          </div>
          {repair.description && (
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 mt-2">
              <p className="text-xs font-semibold text-zinc-500 mb-1">
                รายละเอียดที่ผู้แจ้งระบุ
              </p>
              <p className="text-zinc-900 whitespace-pre-line">
                {repair.description}
              </p>
            </div>
          )}
        </dl>
      </article>

      {/* ฟอร์มจัดการงาน */}
      <section className="xl:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 self-start">
        <h3 className="font-semibold text-zinc-900 mb-4">อัปเดตงานซ่อม</h3>
        <AdminUpdateForm key={repair.updatedAt} repair={repair} techs={techs} />
      </section>
    </div>
  );
}

export default function AdminRepairDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-full bg-zinc-50 pb-16">
      <main className="max-w-6xl mx-auto px-6 pt-10 w-full space-y-6">
        <div>
          <Link
            href="/admin"
            className="text-sm text-zinc-500 hover:text-blue-600 transition-colors"
          >
            ← กลับไปหน้ารายการ
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2">
            รายละเอียดใบงาน
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="h-80 rounded-2xl border border-zinc-200 bg-white animate-pulse" />
          }
        >
          <RepairDetail params={params} />
        </Suspense>
      </main>
    </div>
  );
}
