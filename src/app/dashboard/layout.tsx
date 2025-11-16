import Logo from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { SidebarNav } from "@/components/layout/SidebarNav";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarNav />
        </SidebarContent>
        <div className="p-2 mt-auto flex flex-col gap-2">
            <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/profile">
                    <User />
                    <span>Profile</span>
                </Link>
            </Button>
             <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/">
                    <LogOut />
                    <span>Logout</span>
                </Link>
            </Button>
        </div>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-14 items-center justify-end gap-2 border-b px-4 lg:hidden">
            <ThemeToggle />
            <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
