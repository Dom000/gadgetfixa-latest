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
        title: "Quizes",
        url: "/home",
        icon: Newspaper,
      },
      {
        title: "Quiz histories",
        url: "/home/account/quiz-history",
        icon: History,
      },
      {
        title: "Notifications",
        url: "/home/notification",
        icon: Bell,
      },
      {
        title: "Account",
        url: "#",
        icon: SquareUser,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Profile",
            url: "/home/account",
          },
          {
            title: "Settings",
            url: "/home/account/settings",
          },
        ],
      },
      {
        title: "Ambassadorship",
        url: "#",
        icon: SquareUser,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Active Markets",
            url: "/home/active-markets",
          },
        ],
      },
      {
        title: "Referals & Earnings",
        url: "#",
        icon: Users,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Referals",
            url: "/home/referals",
          },
          {
            title: "Ref. Earnings",
            url: "/home/referals/earnings",
          },
        ],
      },
      {
        title: "Quiz points",
        url: "/home/quiz-points",
        icon: Gem,
      },
      {
        title: "My Jackpots",
        url: "/home/my-jackpots",
        icon: Trophy,
      },
      {
        title: "Tournaments",
        url: "/home/tournaments",
        icon: Swords,
      },
      {
        title: "Team Management",
        url: "#",
        icon: Users,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "My Team",
            url: "/home/team",
          },
          {
            title: "Create Team",
            url: "/home/team/create",
          },
          {
            title: "Add Members",
            url: "/home/team/add-members",
          },
          {
            title: "Transfer Market",
            url: "/home/team/transfer-market",
          },
        ],
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
      {
        title: "Testimonials",
        url: "/admin/testimonials",
        icon: FileVideo2,
      },
      {
        title: "Create & Edit Variables",
        url: "/admin/dynamic-variables",
        icon: Variable,
      },
      {
        title: "Create & Edit Pages",
        url: "/admin/pages",
        icon: Layers2,
      },
      {
        title: "Incentives",
        url: "/admin/incentives",
        icon: Gift,
      },
      {
        title: "Referals",
        url: "/admin/referals",
        icon: Users,
      },
      {
        title: "Prize Redemption",
        url: "/admin/prize-redemption",
        icon: GemIcon,
      },
      {
        title: "Manage Teams",
        url: "/admin/team",
        icon: Users,
      },
      {
        title: "Ambassadors",
        url: "/admin/ambassador",
        icon: Handshake,
      },
      {
        title: "Level",
        url: "#",
        icon: ArrowUpNarrowWide,
        isActive: false,
        showArrow: true,
        items: [
          {
            title: "All Levels",
            url: "/admin/levels",
          },
          {
            title: "Create Level",
            url: "/admin/levels/create_new",
          },
        ],
      },
      {
        title: "Quizes",
        url: "#",
        icon: SquareMenu,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "All Quizes",
            url: "/admin/quizes",
          },
          {
            title: "Create Quiz",
            url: "/admin/quizes/create_new",
          },
        ],
      },
      {
        title: "Quiz points/Jackpots",
        url: "#",
        icon: Trophy,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Quiz points",
            url: "/admin/quiz-points",
          },
          {
            title: "Jackpots",
            url: "/admin/quiz-points/jackpots",
          },
        ],
      },
      {
        title: "Manage Market",
        url: "#",
        icon: Store,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Markets",
            url: "/admin/markets",
          },
          {
            title: "create Market",
            url: "/admin/markets/create-new",
          },
        ],
      },
      {
        title: "Manage Tournament",
        url: "#",
        icon: Swords,
        isActive: true,
        showArrow: true,
        items: [
          {
            title: "Create",
            url: "/admin/tournaments/create-new",
          },
          {
            title: "All Tournaments",
            url: "/admin/tournaments",
          },
        ],
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
