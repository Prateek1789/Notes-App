import { createBrowserClient } from "@supabase/ssr";
import { getEnvVar } from "@/utils/getEnvVar";

export function createClient() {
  const { supabaseUrl, supabaseKey } = getEnvVar();

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
