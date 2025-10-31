"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Shield } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
    role?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams);
  const router = useRouter();

  const handleSwitchAdmin = (event: React.MouseEvent<HTMLDivElement>) => {
    const teamName = event.currentTarget.textContent;
    const selectedTeam = teams.name === teamName ? teams : null;

    if (selectedTeam) {
      if (selectedTeam.role) {
        setActiveTeam({ ...selectedTeam, plan: selectedTeam.role });
        router.push("/admin");
      }
    }
    if (isMobile) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.remove("open");
      }
    }
  };
  const handleSwitchUser = (event: React.MouseEvent<HTMLDivElement>) => {
    const teamName = event.currentTarget.textContent;
    const selectedTeam = teams.name === teamName ? teams : null;

    if (selectedTeam) {
      setActiveTeam(selectedTeam);
      router.push("/home");
    }
    if (isMobile) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.remove("open");
      }
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-14 items-center justify-center ">
                <Link
                  href="/"
                  className=" font-bold bg-gradient-primary bg-clip-text text-transparent"
                >
                  Gadget Fixa
                </Link>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Users
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={handleSwitchUser} className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <teams.logo className="size-4 shrink-0" />
              </div>
              {teams.name}
            </DropdownMenuItem>
            {teams.role && (
              <DropdownMenuItem
                key={teams.name}
                onClick={handleSwitchAdmin}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Shield className="size-4 shrink-0" />
                </div>
                {teams.name}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
