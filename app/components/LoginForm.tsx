"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="p-8 space-y-5">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className={labelClass}>ชื่อผู้ใช้</label>
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          placeholder="เช่น admin"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>รหัสผ่าน</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
