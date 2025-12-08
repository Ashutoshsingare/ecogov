"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Logo from '@/components/shared/Logo';
import { mainNav } from '@/lib/data';
import type { NavItem } from '@/lib/types';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const navItems = mainNav;
  
  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    router.push('/');
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="p-4 flex flex-col h-full">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                </Button>
            </SheetClose>
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item: NavItem) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-foreground/80 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            {isUserLoading ? (
              <div className="space-y-2">
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
              </div>
            ) : user ? (
              <>
                 <Link href="/profile" passHref>
                    <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>Profile</Button>
                </Link>
                <Button className="w-full" onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                    <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>Login</Button>
                </Link>
                <Link href="/signup" passHref>
                    <Button className="w-full" onClick={() => setIsOpen(false)}>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
