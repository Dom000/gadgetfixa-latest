"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, LogOut, User } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useRouter();
  const { toast } = useToast();

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
