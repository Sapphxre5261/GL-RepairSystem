import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        
        {/* โลโก้ / ชื่อระบบ */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            🛠️
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900">
            FixMaster
          </span>
        </Link>

        {/* เมนูด้านซ้าย/กลาง
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            หน้าแรก
          </Link>
          <Link href="/create-repair" className="hover:text-blue-600 transition-colors">
            แจ้งซ่อมอุปกรณ์
          </Link>
          <Link href="/status" className="hover:text-blue-600 transition-colors">
            ติดตามสถานะ
          </Link>
        </div> */}

        {/* ปุ่มด้านขวา (CTA) */}
        {/* <div className="flex items-center gap-3">
          <Link
            href="/create-repair"
            className="rounded-full bg-blue-600 text-white px-5 py-2 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            + แจ้งซ่อมทันที
          </Link>
        </div> */}

      </div>
    </nav>
  );
}