"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Shield,
  SquareUser,
  Frame,
  Map,
  Home,
  PieChart,
  Settings2,
  SquareTerminal,
  Newspaper,
  History,
  Users,
  SquareMenu,
  FileVideo2,
  Rows3,
  ArrowUpNarrowWide,
  Bell,
  Gem,
  Trophy,
  HandCoins,
  Variable,
  Gift,
  GemIcon,
  Layers2,
  Store,
  Handshake,
  Sword,
  Swords,
  Inbox,
  Building2Icon,
  User,
  ConstructionIcon,
} from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCookiesNext } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/store";
import { useDeleteCookie } from "cookies-next";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { User } from "@/types";
import { FaBlog, FaCoins, FaUsers } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { NavMain } from "./NavbarMain";
import { NavUser } from "./NavbarUser";
import { TeamSwitcher } from "./TeamSwitcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppStore((state) => state.userDetails);
  const logout = useAppStore((state) => state.logout);
  const deleteCookie = useDeleteCookie();
  const router = useRouter();

  const setUserDetails = useAppStore((state) => state.login);

  //   const { mutate } = useMutation({
  //     mutationFn: updateProfileToken,
  //     onSuccess: (data) => {
  //       setUserDetails(data);
  //     },
  //     onError: (error) => {
  //       console.log("error", error);
  //     },
  //   });
  //   React.useEffect(() => {
  //     if (token) {
  //       if (user.deviceToken !== token) {
  //         mutate(token);
  //       }
  //       // console.log(token, "token Here__");
  //     }
  //   }, [token]);

  const handleLogout = () => {
    deleteCookie(process.env.NEXT_PUBLIC_USER_LOGGEDIN_COOKIE!);
    logout();
    router.push("/auth");
  };

  const data = {
    user: {
      name: user?.name,
      email: user?.email ?? user?.phoneNumber,
      avatar:
        user?.profileUrl ??
        `https://ui-avatars.com/api/?name=${user?.name}&background=random&size=128`,
    },
    teams: {
      name: user?.name,
      logo: SquareUser,
      plan: "User",
      role: user?.role,
    },
    navMain: [
      {
        title: "Find Arisans",
        url: "/artisans",
        icon: ConstructionIcon,
      },
      {
        title: "Bussiness Management",
        url: "#",
        icon: Building2Icon,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "My Bussinesses",
            url: "/home",
          },
          {
            title: "Create Bussiness",
            url: "/home/create-biz",
          },
        ],
      },
      {
        title: "Inbox",
        url: "/home/inbox",
        icon: Inbox,
      },

      {
        title: "Account",
        url: "/home/account",
        icon: User,
      },
    ],
    admin: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
    ],
  };

  const { getCookie } = useCookiesNext();
  const pathname = usePathname();
  const { open } = useSidebar();

  const isAdmin = getCookie(process.env.NEXT_PUBLIC_ADMIN_LOGGEDIN_COOKIE!);
  const isAdminRoute = pathname.match("/admin*");
  function isGoingToAdminPage() {
    if (isAdmin && isAdminRoute) {
      return data.admin;
    } else if (isAdminRoute) {
      return data.admin;
    } else {
      return data.navMain;
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(!isAdmin && !isAdminRoute ? " space-y-10" : "")}
      >
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={isGoingToAdminPage()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={handleLogout} user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
