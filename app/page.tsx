export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-accent">Sub2Unlock</h1>
        <p className="text-neutral-400 text-sm">
          Link gate pribadi. Buka link unlock kamu lewat URL{" "}
          <code className="text-accent">/unlock/[slug]</code>
        </p>
      </div>
    </main>
  );
}
