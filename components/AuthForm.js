"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError((await res.json()).error || "خطایی رخ داد.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="auth">
      <h1>{isRegister ? "ساخت حساب کاربری" : "ورود به حساب"}</h1>
      {isRegister && <label>نام<input name="name" required autoComplete="name" /></label>}
      <label>ایمیل<input name="email" type="email" required dir="ltr" autoComplete="email" /></label>
      <label>رمز عبور<input name="password" type="password" required minLength={6} dir="ltr"
        autoComplete={isRegister ? "new-password" : "current-password"} /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn" disabled={busy}>{isRegister ? "ثبت‌نام" : "ورود"}</button>
      <p className="meta">
        {isRegister ? <>حساب دارید؟ <Link href="/login">وارد شوید</Link></> : <>حساب ندارید؟ <Link href="/register">ثبت‌نام کنید</Link></>}
      </p>
    </form>
  );
}
