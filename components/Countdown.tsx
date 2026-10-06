"use client";

import { useEffect, useState } from "react";

function sisa(target: number) {
  const diff = Math.max(0, target - Date.now());
  const hari = Math.floor(diff / 86_400_000);
  const jam = Math.floor((diff % 86_400_000) / 3_600_000);
  const menit = Math.floor((diff % 3_600_000) / 60_000);
  const detik = Math.floor((diff % 60_000) / 1000);
  return { hari, jam, menit, detik };
}

export default function Countdown({ iso }: { iso: string }) {
  const target = new Date(`${iso}T00:00:00+07:00`).getTime();
  const [t, setT] = useState(() => sisa(target));

  useEffect(() => {
    const id = setInterval(() => setT(sisa(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Hari", v: t.hari },
    { label: "Jam", v: t.jam },
    { label: "Menit", v: t.menit },
    { label: "Detik", v: t.detik },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-gold/25 bg-white/70 px-3 py-3 shadow-sm backdrop-blur sm:min-w-[5.5rem]"
        >
          <span className="font-serif text-3xl font-semibold text-gold tabular-nums sm:text-4xl">
            {String(it.v).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.65rem] font-medium tracking-[0.15em] text-ink-soft uppercase">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
