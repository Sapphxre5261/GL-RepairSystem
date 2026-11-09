"use client";

import { useActionState } from "react";
import { deleteRepair, updateRepair } from "@/app/actions/repair";
import { PRIORITIES, STATUSES } from "@/app/lib/constants";
import type { Repair } from "@/app/lib/repairs";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

export default function AdminUpdateForm({
  repair,
  techs,
}: {
  repair: Repair;
  techs: { id: number; name: string }[];
}) {
  const [state, formAction, pending] = useActionState(updateRepair, null);
  const [deleteState, deleteAction, deleting] = useActionState(deleteRepair, null);

  const error = state?.error ?? deleteState?.error;

  return (
    <form className="space-y-5">
      <input type="hidden" name="id" value={repair.id} />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.success}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>สถานะงาน</label>
          <select
            name="status"
            defaultValue={repair.status}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>ระดับความสำคัญ</label>
          <select
            name="priority"
            defaultValue={repair.priority}
            className={inputClass}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>ช่างผู้รับผิดชอบ</label>
        <select
          name="assigned_tech"
          defaultValue={repair.assignedTechId ?? ""}
          className={inputClass}
        >
          <option value="">— ยังไม่มอบหมาย —</option>
          {techs.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>หมายเหตุสำหรับผู้แจ้ง / ทีมช่าง</label>
        <textarea
          name="admin_note"
          rows={4}
          defaultValue={repair.adminNote}
          placeholder="เช่น นัดเข้าซ่อมวันจันทร์ 10:00 น., รออะไหล่, สาเหตุที่ยกเลิก..."
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
        <button
          formAction={deleteAction}
          disabled={deleting}
          onClick={(e) => {
            if (!confirm("ยืนยันการลบใบงานนี้? ข้อมูลจะหายถาวร")) {
              e.preventDefault();
            }
          }}
          className="px-4 py-2 rounded-full border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          {deleting ? "กำลังลบ..." : "ลบใบงาน"}
        </button>
        <button
          formAction={formAction}
          disabled={pending}
          className="px-8 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "กำลังบันทึก..." : "บันทึกการอัปเดต"}
        </button>
      </div>
    </form>
  );
}
