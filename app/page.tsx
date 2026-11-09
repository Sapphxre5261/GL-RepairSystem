import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-zinc-50 font-sans text-zinc-900 w-full">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-4xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          ระบบแจ้งซ่อมบำรุงออนไลน์
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900">
          แจ้งซ่อมง่าย ติดตามงานไว <br />
          <span className="text-blue-600">จบครบในที่เดียว</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-zinc-600 leading-relaxed">
          แพลตฟอร์มแจ้งปัญหาอุปกรณ์ชำรุด อาคารสถานที่
          หรือระบบสาธารณูปโภคภายในองค์กร
          ช่วยให้ทีมช่างทำงานได้เป็นระบบ และคุณเช็คสถานะงานซ่อมได้แบบเรียลไทม์
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          <Link
            href="/req-repair"
            className="flex h-12 w-full sm:w-48 items-center justify-center rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            แจ้งซ่อมทันที 🚀
          </Link>
          <Link
            href="/track"
            className="flex h-12 w-full sm:w-48 items-center justify-center rounded-full border border-zinc-300 bg-white font-medium hover:bg-zinc-100 transition-colors text-zinc-800"
          >
            ติดตามสถานะ
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-16 text-left">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="text-2xl">⚡</div>
            <h3 className="font-semibold text-lg text-zinc-900">รวดเร็ว ทันใจ</h3>
            <p className="text-sm text-zinc-600">
              แจ้งเรื่องผ่านระบบออนไลน์ได้ทันที ไม่ต้องเดินเอกสาร
              ระบบส่งตรงถึงมือช่างพร้อมเลขใบงาน
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="text-2xl">📊</div>
            <h3 className="font-semibold text-lg text-zinc-900">ติดตามสถานะได้</h3>
            <p className="text-sm text-zinc-600">
              เช็คได้ว่างานของคุณอยู่ในขั้นตอน รอดำเนินการ กำลังซ่อม
              หรือเสร็จสิ้นแล้ว ด้วยเลขใบงานหรืออีเมล
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-3">
            <div className="text-2xl">📱</div>
            <h3 className="font-semibold text-lg text-zinc-900">
              รองรับทุกอุปกรณ์
            </h3>
            <p className="text-sm text-zinc-600">
              ใช้งานได้สะดวกทั้งบนสมาร์ทโฟน แท็บเล็ต และคอมพิวเตอร์ ทุกที่ ทุกเวลา
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 bg-white">
        © FixMaster Maintenance System. All rights reserved.
      </footer>
    </main>
  );
}
