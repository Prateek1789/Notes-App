import { cookies } from "next/headers";
import { Database, Notebooks } from "@/types";
import { createServerClient } from "@supabase/ssr";

import { AppStoreProvider } from "@/features/dashboard/components/layout/store-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import Data from "@/app/data.json";


const DashboardLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  /* const cookieStore = await cookies(); */
  const userData = Data;
  let profile = userData.user;
  let notebooks:Notebooks[] = userData.notebooks;

  /* const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { get: (name) =>  cookieStore.get(name)?.value } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const [
      { data: userData, error: userError }, 
      { data: nbData, error: nbError }
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", user.id).single(),
      supabase.from("notebooks").select("*").eq("user_id", user.id),
    ]);

    if (userError || nbError) console.log("Failed to load initial data: ", userError || nbError);

    profile = userData;
    notebooks = nbData || [];
  }; */

  return (
    <AppStoreProvider 
      user={profile} 
      notebooks={notebooks}
    >
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </AppStoreProvider>
  )
};

export default DashboardLayout