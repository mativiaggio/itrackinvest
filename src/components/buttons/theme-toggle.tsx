"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface modelToggleProps {
  buttonClasses?: string;
  iconSize?: string;
}

export function ModeToggle({ buttonClasses, iconSize }: modelToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={buttonClasses}>
          <Sun
            className={`${
              iconSize ? iconSize : "h-[1.2rem] w-[1.2rem]"
            } rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
          />
          <Moon
            className={`absolute ${
              iconSize ? iconSize : "h-[1.2rem] w-[1.2rem]"
            } rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
