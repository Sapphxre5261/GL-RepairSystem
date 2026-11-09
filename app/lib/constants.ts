export const STATUSES = [
  {
    value: "pending",
    label: "รอดำเนินการ",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  {
    value: "in_progress",
    label: "กำลังดำเนินการ",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    value: "completed",
    label: "เสร็จสิ้น",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  {
    value: "cancelled",
    label: "ยกเลิก",
    badge: "bg-zinc-100 text-zinc-500 border-zinc-300",
    dot: "bg-zinc-400",
  },
] as const;

export const CATEGORIES = [
  { value: "electrical", label: "ระบบไฟฟ้า", icon: "⚡" },
  { value: "plumbing", label: "ประปา/สุขภัณฑ์", icon: "🚰" },
  { value: "aircon", label: "เครื่องปรับอากาศ", icon: "❄️" },
  { value: "building", label: "อาคาร/สถานที่", icon: "🏢" },
  { value: "equipment", label: "อุปกรณ์/เครื่องใช้", icon: "🖨️" },
  { value: "network", label: "คอมพิวเตอร์/เครือข่าย", icon: "🌐" },
  { value: "other", label: "อื่นๆ", icon: "🔧" },
] as const;

export const PRIORITIES = [
  {
    value: "low",
    label: "ต่ำ",
    badge: "bg-zinc-100 text-zinc-600 border-zinc-300",
  },
  {
    value: "normal",
    label: "ปกติ",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    value: "high",
    label: "สูง",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    value: "urgent",
    label: "เร่งด่วน",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
] as const;

export type StatusValue = (typeof STATUSES)[number]["value"];
export type PriorityValue = (typeof PRIORITIES)[number]["value"];

export function statusMeta(status: string) {
  return STATUSES.find((s) => s.value === status) ?? STATUSES[0];
}

export function statusLabel(status: string) {
  return statusMeta(status).label;
}

export function categoryMeta(category: string) {
  return CATEGORIES.find((c) => c.value === category) ?? CATEGORIES[CATEGORIES.length - 1];
}

export function priorityMeta(priority: string) {
  return PRIORITIES.find((p) => p.value === priority) ?? PRIORITIES[1];
}
