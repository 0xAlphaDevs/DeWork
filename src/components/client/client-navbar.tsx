"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ConnectKitButton } from "connectkit";

export function ClientNavbar() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const isActiveRoute = (route: string) => router.pathname === route;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-20">
        <h1 className="text-2xl font-bold relative mr-12 dark:text-purple-50">
          DeWork{" "}
          <sup className="text-sm font-semibold absolute ml-2 dark:text-purple-50">
            Client
          </sup>
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/client/dashboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveRoute("/client/dashboard")
                      ? "bg-green-300 dark:bg-purple-800  "
                      : ""
                  )}
                >
                  Listed Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/client/ongoing-jobs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveRoute("/client/ongoing-jobs")
                      ? "bg-green-300 dark:bg-purple-800  "
                      : ""
                  )}
                >
                  Ongoing Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/client/wallet" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveRoute("/client/wallet")
                      ? "bg-green-300 dark:bg-purple-800  "
                      : ""
                  )}
                >
                  Your Wallet
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex gap-5">
        <ConnectKitButton showBalance />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-100 dark:text-black hover:bg-slate-100"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
