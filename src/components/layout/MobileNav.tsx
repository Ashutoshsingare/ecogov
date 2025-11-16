import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Logo from '@/components/shared/Logo';
import { mainNav, homeNav } from '@/lib/data';
import type { NavItem } from '@/lib/types';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const navItems = isHomePage ? homeNav : mainNav;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (isHomePage && href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.substring(2);
        const section = document.getElementById(sectionId);
        if (section) {
            setTimeout(() => {
                 window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 300); // Delay to allow sheet to close
        }
    }
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
        <div className="p-4">
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
                onClick={(e) => isHomePage ? handleScrollTo(e, item.href) : setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
             <Link href="/login" passHref>
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>Login</Button>
            </Link>
            <Link href="/signup" passHref>
                <Button className="w-full" onClick={() => setIsOpen(false)}>Sign Up</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
