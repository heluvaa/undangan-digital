import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Admin — Order",
  description: "Panel admin: daftar order masuk dan status pengerjaan.",
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <>
      <Nav />
      <main className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="text-xs font-medium tracking-[0.4em] text-gold uppercase">
              Admin
            </p>
            <h1 className="mt-3 font-serif text-4xl">Kelola Order</h1>
          </header>
          <div className="mt-10">
            <AdminPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
