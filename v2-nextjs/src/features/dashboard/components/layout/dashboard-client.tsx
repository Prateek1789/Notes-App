"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { ViewProvider } from "./view-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ThemeToggle from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import AppSidebar from "./sidebar"
import NoteList from "./note-list"

export default function DashboardClient() {
  const isMobile = useIsMobile();

  return (
    <TooltipProvider>
      <ViewProvider>
        <AppSidebar />
        {!isMobile && <NoteList />}
			</ViewProvider>

			<div className="flex h-screen w-screen max-w-screen shrink flex-col items-start justify-start">
        <div className="flex h-auto w-full items-center justify-between border-b px-2 py-2">
          <SidebarTrigger className="lg:hidden" />
          <ThemeToggle className="ml-auto" />
        </div>
        <section className="flex h-full w-full max-w-full flex-col items-center justify-center gap-4 border-0 p-2">
          <h1 className="max-w-[18ch] text-center text-h1">
            Noteflow, where ideas meet the tools
          </h1>
          <Button variant={"destructive"}>Delete</Button>
        </section>
      </div>
    </TooltipProvider>
  )
};