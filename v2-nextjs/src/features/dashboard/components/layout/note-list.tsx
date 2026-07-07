"use client"

import { motion } from "motion/react"
import { useView } from "./view-provider"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Sidebar,
	SidebarHeader, 
	SidebarMenu, 
	SidebarMenuItem, 
	SidebarMenuButton, 
	SidebarTrigger, 
	SidebarContent, 
	SidebarGroup, 
	SidebarGroupLabel, 
	SidebarGroupContent 
} from "@/components/ui/sidebar"

import { ArrowLeft, FileText } from "lucide-react"
import Data from "@/app/data.json" // Placeholder data file

const notes = Data.notes; // Placeholder data to mimic real notes

export default function NoteList() {
	const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <motion.div
          initial={{ scale: 0.9, x: "100%" }}
          animate={{ x: ["100%", "0%", "0%"], scale: [0.9, 0.9, 1] }}
          exit={{ scale: [1, 0.9, 0.9], x: ["0%", "0%", "100%"] }}
          transition={{
            type: "keyframes",
            duration: 0.4,
            times: [0, 0.5, 1],
          }}
          className="absolute top-0 left-0 flex h-full w-full flex-col bg-sidebar shadow-2xl"
        >
			  <NoteListHeader />
			  <NoteListContent />
      </motion.div>
    )
  };
  
  return (
    <Sidebar
      collapsible={"none"}
      className="w-75 h-full bg-background border-r shrink-0"
    >
      <NoteListHeader />
			<NoteListContent />
    </Sidebar>
  )
};

function NoteListHeader() {
	const { setView } = useView();

	return (
		<SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className={`flex items-center justify-between`}>
          <SidebarMenuButton
            onClick={() => setView("main")}
            className="flex h-8 w-8 items-center justify-center rounded-full lg:hidden"
          >
            <ArrowLeft />
          </SidebarMenuButton>
          <span className={`overflow-hidden font-grotesk text-xl! font-semibold tracking-normal select-none`}>
            Secondary
          </span>
          <SidebarTrigger className="p-3.75 lg:hidden" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
	)
};

function NoteListContent() {
	return (
		<SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="gap-2">
          <span>Notebooks</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {notes.map(n => {
              return (
                <SidebarMenuItem key={n.id}>
                  <SidebarMenuButton>
                    <FileText size={16} />
                    <span>{n.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
  	</SidebarContent>
	)
};