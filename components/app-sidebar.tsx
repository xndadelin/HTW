'use client'

import { Calendar, Home, Inbox, Search, Settings, User2, ChevronUp, Trophy, BookOpen, ListOrdered, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useGetUser from "@/lib/useGetUser";
import Link from "next/link";
import supabase from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Challenges",
    url: "/challenges",
    icon: Trophy,
  },
  {
    title: "Writeups",
    url: "/writeups",
    icon: BookOpen,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: ListOrdered,
  },
  {
    title: "Learn",
    url: "/learn",
    icon: GraduationCap,
  },
]

export function AppSidebar() {
  const { user } = useGetUser();
  const router = useRouter()

  if (!user) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full justify-between">
        <div>
          <SidebarHeader>
            <Link href="/" className="flex gap-2 items-center justify-center mt-4" prefetch={false}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#EF4444" viewBox="0 0 448 512">
                <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z" />
              </svg>
              <span className="text-lg font-bold">Hack The Way</span>
            </Link>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2 px-2 py-1">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />
                    <span className="ml-2">{user.user_metadata?.full_name}</span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/account/${user.id}`);
                    }}
                  >
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}