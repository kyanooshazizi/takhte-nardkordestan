import Link from "next/link";
import { getUser } from "@/lib/auth";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="header">
      <div className="wrap bar">
        <Link href="/" className="logo">تخته‌نرد ایران</Link>
        <nav>
          {user ? (
            <>
              <span>{user.name}</span>
              <form action="/api/auth/logout" method="post"><button className="link">خروج</button></form>
            </>
          ) : (
            <>
              <Link href="/login">ورود</Link>
              <Link href="/register" className="btn small">ثبت‌نام</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
