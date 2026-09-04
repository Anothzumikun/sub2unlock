"use client";

import { useEffect, useState } from "react";

type LinkData = {
  id: string;
  slug: string;
  title: string;
  platform_name: string;
  platform_url: string;
  target_link: string;
  delay_seconds: number;
};

export default function UnlockClient({ link }: { link: LinkData }) {
  const [step, setStep] = useState<"start" | "waiting" | "unlocked">("start");
  const [countdown, setCountdown] = useState(link.delay_seconds || 15);

  useEffect(() => {
    if (step !== "waiting") return;
    if (countdown <= 0) {
      setStep("unlocked");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  function handleGoToPlatform() {
    window.open(link.platform_url, "_blank", "noopener,noreferrer");
    setStep("waiting");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-card rounded-2xl p-6 space-y-5 border border-neutral-800">
        <h1 className="text-xl font-bold text-center">{link.title}</h1>

        {step === "start" && (
          <div className="space-y-4 text-center">
            <p className="text-neutral-400 text-sm">
              Untuk membuka link ini, silakan subscribe/follow dulu ke{" "}
              <span className="text-accent">{link.platform_name}</span>.
            </p>
            <button
              onClick={handleGoToPlatform}
              className="w-full py-3 rounded-xl bg-accent text-black font-semibold active:scale-95 transition"
            >
              Buka {link.platform_name}
            </button>
          </div>
        )}

        {step === "waiting" && (
          <div className="space-y-4 text-center">
            <p className="text-neutral-400 text-sm">
              Terima kasih sudah subscribe! Link akan terbuka otomatis dalam:
            </p>
            <div className="text-4xl font-bold text-accent">{countdown}s</div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-1000"
                style={{
                  width: `${
                    100 - (countdown / (link.delay_seconds || 15)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        {step === "unlocked" && (
          <div className="space-y-4 text-center">
            <p className="text-accent text-sm font-medium">
              Link sudah terbuka! 🎉
            </p>
            <a
              href={link.target_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl bg-accent text-black font-semibold active:scale-95 transition"
            >
              Buka Link Sekarang
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
