import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";
import { getCurrentTech } from "@/app/lib/auth";

async function LoginCard() {
  const tech = await getCurrentTech();
  if (tech) {
    redirect("/admin");
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/50 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-md shadow-blue-500/20">
            🔧
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            เข้าสู่ระบบช่าง
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            สำหรับทีมช่างและผู้ดูแลระบบ เพื่อจัดการใบงานซ่อม
          </p>
        </div>
        <LoginForm />
      </div>
      <p className="text-center text-xs text-zinc-500 mt-4">
        ไม่ใช่ช่าง?{" "}
        <Link href="/track" className="text-blue-600 hover:underline">
          ติดตามสถานะงานซ่อมได้ที่นี่
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col bg-zinc-50">
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-80 rounded-2xl border border-zinc-200 bg-white animate-pulse" />
          }
        >
          <LoginCard />
        </Suspense>
      </main>
    </div>
  );
}
