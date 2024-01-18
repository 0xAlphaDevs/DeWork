import React from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div>
      <div className="flex justify-between px-8 pt-4">
        <div className="text-2xl font-bold dark:text-purple-50">DeWork</div>
        <div className="flex gap-5">
          {/* theme icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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
      <div className="flex flex-col gap-10 items-center px-8 py-20">
        <h1 className="text-6xl font-bold dark:text-purple-50">
          Welcome to DeWork
        </h1>
        <p className="text-3xl dark:text-purple-100 text-center">
          A Decentralized freelancing platform connecting businesses and
          professionals
        </p>
        <ConnectKitButton />
      </div>
      {/* Features card div */}

      <div className="container mx-auto py-8 ">
        <hr className="border-t-2 border-gray-600 dark:border-white mb-4" />
        <div className="flex justify-center items-center">
          <p>&copy; 2024 DeWork. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
