// คืนค่าเวลาปัจจุบันตามเขตเวลาไทยในรูปแบบ "YYYY-MM-DD HH:mm:ss"
export function thaiNow() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

// แปลง "YYYY-MM-DD HH:mm:ss" เป็นรูปแบบวันที่ไทยที่อ่านง่าย
export function formatThaiDateTime(value: string) {
  const iso = value.replace(" ", "T");
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
