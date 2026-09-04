import { supabasePublic } from "@/lib/supabase";
import UnlockClient from "./UnlockClient";
import { notFound } from "next/navigation";

// 1 request server-side per kunjungan halaman (bukan per detik), hemat invocation
export default async function UnlockPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await supabasePublic
    .from("links")
    .select("id, slug, title, platform_name, platform_url, target_link, delay_seconds")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    notFound();
  }

  return <UnlockClient link={data} />;
}
