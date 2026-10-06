import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Form Order",
  description:
    "Isi form order undangan digital: pilih desain & paket, masukkan data acara, kami buatkan 1–3 hari.",
};

export default function OrderPage() {
  return (
    <>
      <Nav />
      <main className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <header className="text-center">
            <p className="text-xs font-medium tracking-[0.4em] text-gold uppercase">
              Order
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
              Form Order Undangan
            </h1>
            <p className="mt-4 text-ink-soft">
              Isi data di bawah. Pembayaran & kirim foto menyusul via WhatsApp
              setelah order tercatat.
            </p>
          </header>
          <div className="mt-10">
            <Suspense>
              <OrderForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
