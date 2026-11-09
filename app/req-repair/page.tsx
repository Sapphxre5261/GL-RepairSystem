
import { createRepair } from "../actions/repair"
export default function ReqRepair() {
    return (
        <div className="min-h-screen bg-zinc-50 pb-16">            
            <main className="max-w-3xl mx-auto px-6 pt-10">
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
                            กรอกรายละเอียดข้อมูลและปัญหาที่พบเพื่อให้ทีมงานเข้าตรวจสอบได้อย่างรวดเร็ว
                        </p>
                    </div>

                    {/* Form Body */}
                    <form action={createRepair} className="p-8 space-y-6">
                        
                        {/* หัวข้อเรื่อง */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                หัวข้อเรื่อง <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="เช่น แอร์ห้องประชุมใหญ่ไม่เย็น, ปลั๊กไฟช็อต"
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* ข้อมูลผู้แจ้ง */}
                        <div className="space-y-4 pt-2">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-b pb-2">
                                ข้อมูลผู้ติดต่อ
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">ชื่อ</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="ชื่อจริง"
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">นามสกุล</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="นามสกุล"
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Line สำหรับติดต่อกลับ</label>
                                    <input
                                        type="text"
                                        name="line_id"
                                        placeholder="Line ID หรือเบอร์โทร"
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* รายละเอียด */}
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                รายละเอียดเพิ่มเติม
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="ระบุอาการ สถานที่ หรือจุดสังเกตเพิ่มเติม..."
                                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* ปุ่มส่งฟอร์ม */}
                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
                            <button
                                type="submit"
                                className="px-8 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                ส่งเรื่องแจ้งซ่อม 🚀
                            </button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    )
}