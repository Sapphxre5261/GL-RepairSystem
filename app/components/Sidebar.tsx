import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-zinc-200 hidden md:flex flex-col p-6 space-y-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        เมนูหลัก
      </div>
      <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-600">
        <Link href="/" className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-blue-600 transition-colors">
          🏠 หน้าแรก
        </Link>
        <Link href="/req-repair" className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-blue-600 transition-colors">
          📝 แจ้งซ่อมอุปกรณ์
        </Link>
        <Link href="/track" className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-blue-600 transition-colors">
          📊 ติดตามสถานะ
        </Link>
        <Link href="/admin" className="px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-blue-600 transition-colors">
          🛠️ จัดการงานซ่อม
        </Link>
      </nav>
    </aside>
  );
}
