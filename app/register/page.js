import AuthForm from "@/components/AuthForm";
export const metadata = { title: "ثبت‌نام", robots: { index: false } };
export default function Page() { return <main className="wrap"><AuthForm mode="register" /></main>; }
