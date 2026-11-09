"use client";

import { useActionState } from "react";
import { createRepair } from "@/app/actions/repair";
import { CATEGORIES, PRIORITIES } from "@/app/lib/constants";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

export default function RepairForm() {
  const [state, formAction, pending] = useActionState(createRepair, null);

  return (
    <form action={formAction} className="p-8 space-y-6">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* หัวข้อเรื่อง */}
      <div>
        <label className={labelClass}>
          หัวข้อเรื่อง <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="เช่น แอร์ห้องประชุมใหญ่ไม่เย็น, ปลั๊กไฟช็อต"
          className={inputClass}
        />
      </div>

      {/* หมวดหมู่ + สถานที่ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            หมวดหมู่ <span className="text-red-500">*</span>
          </label>
          <select name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              เลือกหมวดหมู่
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            สถานที่/จุดที่พบปัญหา <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            required
            placeholder="เช่น อาคาร A ชั้น 3 ห้อง 301"
            className={inputClass}
          />
        </div>
      </div>

      {/* ความสำคัญ */}
      <div>
        <label className={labelClass}>ระดับความสำคัญ</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRIORITIES.map((p) => (
            <label
              key={p.value}
              className="flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2.5 text-sm text-zinc-700 cursor-pointer has-checked:border-blue-500 has-checked:bg-blue-50 has-checked:text-blue-700 transition-all"
            >
              <input
                type="radio"
                name="priority"
                value={p.value}
                defaultChecked={p.value === "normal"}
                className="accent-blue-600"
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      {/* ข้อมูลผู้แจ้ง */}
      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-b pb-2">
          ข้อมูลผู้ติดต่อ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              required
              placeholder="ชื่อจริง"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              required
              placeholder="นามสกุล"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Line ID / เบอร์โทร <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="line_id"
              required
              placeholder="Line ID หรือเบอร์โทร"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* รายละเอียด */}
      <div className="pt-2">
        <label className={labelClass}>รายละเอียดเพิ่มเติม</label>
        <textarea
          name="description"
          rows={4}
          placeholder="ระบุอาการ สถานที่ หรือจุดสังเกตเพิ่มเติม..."
          className={inputClass}
        />
      </div>

      {/* ปุ่มส่งฟอร์ม */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
        <button
          type="submit"
          disabled={pending}
          className="px-8 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "กำลังส่ง..." : "ส่งเรื่องแจ้งซ่อม 🚀"}
        </button>
      </div>
    </form>
  );
}
