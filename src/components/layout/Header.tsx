"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { mainNav, homeNav } from "@/lib/data";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('');
  
  const isHomePage = pathname === '/';
  const navItems = isHomePage ? homeNav : mainNav;

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = homeNav.map(item => document.getElementById(item.href.substring(2)));
      let currentSection = '';

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            currentSection = `#${section.id}`;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isHomePage]);


  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.substring(2);
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Logo />
        <nav className="ml-8 hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item: NavItem) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                isHomePage ? (activeSection === item.href.substring(1) ? "text-primary" : "text-foreground/60") : (pathname === item.href ? "text-primary" : "text-foreground/60")
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" passHref>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button>Sign Up</Button>
            </Link>
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
