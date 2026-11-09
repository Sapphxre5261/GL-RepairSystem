import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col bg-zinc-50 overflow-y-auto">
        {children}
      </main>
    </>
  );
}
