"use client"

import { motion, AnimatePresence } from "motion/react"

import {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { 
  DropdownMenu, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuContent, 
} from "@/components/ui/dropdown-menu"

import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar"

import { 
  Cog, 
  Star, 
  Folder, 
  LogOut, 
  Trash2, 
  FileText, 
  ChevronsUpDown, 
} from "lucide-react"

import NoteList from "./note-list"
import { useView } from "./view-provider"
import { useAppStore } from "./store-provider"
import { useIsMobile } from "@/hooks/use-mobile"

const mainActions = [
  { label: "All Notes", total: 12, icon: FileText },
  { label: "Favorites", total: 5, icon: Star },
  { label: "Trash", total: 6, icon: Trash2 },
];

export default function AppSidebar() {
  const { view } = useView();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sidebar collapsible="offcanvas">
        <div className="relative h-full overflow-hidden flex flex-col">
          <AnimatePresence initial={false}>
            { view === "main" ? <SidebarMobile key={"main"} /> : <NoteList key={"list"} /> }
          </AnimatePresence>
        </div>
      </Sidebar>
    )
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarDesktop />
    </Sidebar>
  )
};

function SidebarMobile() {
  return (
    <SidebarWrapperAnimated>
      <AppSidebarHeader />
      <SidebarContent>
        <PrimaryActions />
        <SecondaryActions />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </SidebarWrapperAnimated>
  )
};

function SidebarDesktop() {
  return (
    <>
      <AppSidebarHeader />
      <SidebarContent>
        <PrimaryActions />
        <SecondaryActions />
      </SidebarContent>

      <SidebarFooter>
          <UserMenu />
      </SidebarFooter>
    </>
  )
};

function SidebarWrapperAnimated({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "0%", scale: 1 }}
      animate={{ x: ["100%", "0%", "0%"], scale: [0.9, 0.9, 1] }}
      exit={{ scale: [1, 0.9, 0.9], x: ["0%", "0%", "100%"] }}
      transition={{
        type: "keyframes",
        duration: 0.4,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      }}
      className="absolute top-0 left-0 flex h-full w-full flex-col bg-sidebar shadow-2xl"
    >
      {children}
    </motion.div>
  )
};

function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-between">
          <span className="translate-x-1.75 overflow-hidden font-grotesk text-xl! font-semibold tracking-normal select-none">
            NoteFlow
          </span>
          <SidebarTrigger className="p-3.75" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
};

function PrimaryActions() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="sr-only">
        Primary Actions
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainActions.map((action) => {
            return (
              <SidebarMenuItem key={action.label}>
                <SidebarMenuButton
                  tooltip={action.label}
                  className={`${action.label === "Trash" ? "text-destructive" : ""}`}
                >
                  <action.icon size={16} />
                  <span>{action.label}</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-accent">
                  {action.total}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
};

function SecondaryActions() {
  const notebooks = useAppStore(store => store.notebooks);
  const { setView } = useView();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="gap-2">
        <span>Notebooks</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {notebooks.map((nb) => {
            return (
              <SidebarMenuItem key={nb.id}>
                <SidebarMenuButton
                  tooltip={nb.title}
                  onClick={() => setView("noteList")}
                >
                  <Folder size={16} />
                  <span>{nb.title}</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-accent">
                  4
                </SidebarMenuBadge>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
};

function UserMenu() {
  const user = useAppStore(store => store.user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" 
              size={"lg"}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage />
                <AvatarFallback className="rounded-full bg-blue-500 text-white">{user?.user_name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-px text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.user_name}</span>
                <span className="truncate font-light text-xs">{user?.user_email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Cog />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
};