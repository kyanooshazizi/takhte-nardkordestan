import AuthForm from "@/components/AuthForm";
export const metadata = { title: "ورود", robots: { index: false } };
export default function Page() { return <main className="wrap"><AuthForm mode="login" /></main>; }
