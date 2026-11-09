import Link from "next/link";
export default function NotFound() {
  return <main className="wrap"><p className="empty">این صفحه پیدا نشد. <Link href="/">بازگشت به فروشگاه</Link></p></main>;
}
