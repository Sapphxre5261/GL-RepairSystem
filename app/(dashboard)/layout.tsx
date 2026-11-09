import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-73px)]">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-zinc-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}