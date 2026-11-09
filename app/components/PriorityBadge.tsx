import { priorityMeta } from "@/app/lib/constants";

export default function PriorityBadge({ priority }: { priority: string }) {
  const meta = priorityMeta(priority);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${meta.badge}`}
    >
      {meta.label}
    </span>
  );
}
