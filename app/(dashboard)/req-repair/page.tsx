import RepairForm from "@/app/components/RepairForm";

export default function ReqRepair() {
  return (
    <div className="min-h-full bg-zinc-50 pb-16">
      <main className="max-w-3xl mx-auto px-6 pt-10 w-full">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/50">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Maintenance Form
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-2">
              ยื่นเรื่องแจ้งซ่อม
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              กรอกรายละเอียดข้อมูลและปัญหาที่พบ
              เมื่อส่งสำเร็จระบบจะออกเลขใบงานสำหรับติดตามสถานะ
            </p>
          </div>

          <RepairForm />
        </div>
      </main>
    </div>
  );
}
