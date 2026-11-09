import { Suspense } from "react";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { getCurrentTech } from "@/app/lib/auth";

async function TechGate({ children }: { children: React.ReactNode }) {
  const tech = await getCurrentTech();
  if (!tech) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      <div className="bg-white border-b border-zinc-200 px-6 py-2.5 flex items-center justify-between gap-4 text-sm">
        <span className="text-zinc-600">
          🔧 เข้าสู่ระบบในชื่อ{" "}
          <span className="font-semibold text-zinc-900">{tech.name}</span>
          <span className="text-zinc-400"> (@{tech.username})</span>
        </span>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-zinc-300 px-4 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-red-600 transition-colors"
          >
            ออกจากระบบ
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-zinc-500">
          กำลังตรวจสอบสิทธิ์...
        </div>
      }
    >
      <TechGate>{children}</TechGate>
    </Suspense>
  );
}
