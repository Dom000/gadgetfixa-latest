"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut, User, PanelLeft, Ellipsis } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "./ui/sidebar";
import { Input } from "./ui/input";

const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useRouter();
  const { toast } = useToast();
  const { toggleSidebar, open } = useSidebar();

  useEffect(() => {
    // Set up auth state listener
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange((event, session) => {
    //   setUser(session?.user ?? null);
    // });
    // // Check for existing session
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setUser(session?.user ?? null);
    // });
    // return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    // const { error } = await supabase.auth.signOut();
    // if (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Logout failed",
    //     description: error.message,
    //   });
    // } else {
    //   toast({
    //     title: "Logged out",
    //     description: "You have been successfully logged out.",
    //   });
    //   navigate("/");
    // }
  };
  const path = usePathname();
  if (path.match("/home*|/admin*")) {
    return (
      <div
        className={cn(
          "flex h-16 bg-gray-50 justify-end bg-clip-padding backdrop-filter backdrop-blur-md   shadow-sm  space-x-3 md:space-x-1 py-3 sm:py-3 px-2 sm:px-14   z-10 sticky top-0 w-full ",
          open ? "justify-evenly sm:px-16" : "justify-between"
        )}
      >
        <Button
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 hidden",
            open ? " sm:mr-48 md:mr-48" : "sm:mr-80 md:mr-96"
          )}
          onClick={(event) => {
            toggleSidebar();
          }}
        >
          <PanelLeft />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="relative w-4/5 md:w-2/5 ">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Quiz title" type="text" className="pl-8" />{" "}
        </div>
      </div>
    );
  }

  return (
    <header className=" border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
        >
          Gadget Fixa
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/artisans"
            className="text-foreground hover:text-primary transition-colors"
          >
            Find Artisans
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="hero">Get Started</Button>
            </Link>
          )}

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
