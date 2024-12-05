"use client";
import { ChartColumnIncreasing, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavbarMenuButton from "./buttons/navbar-menu-button";
import { ModeToggle } from "./buttons/theme-toggle";

import { UserDropdown } from "./dropdowns/user-dropdown";
import { Button } from "./ui/button";
import { Menu } from "./ui/navbar-menu";
import { usePathname } from "next/navigation";
import GeckoCryptoWidgetBar from './widgets/gecko-widget-bar';

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    // Cierra el menú cada vez que la ruta cambia
    setIsNavbarOpen(false);
  }, [pathname]); // Escucha cambios en pathname

  return (
    <div className="relative z-10">
      <GeckoCryptoWidgetBar/>
      <div className="flex h-fit max-h-[10vh] items-center justify-between border-y px-4 py-2 sm:px-6 md:px-8 lg:px-10">
        <div className="flex w-1/6">
          <Link className="flex items-center justify-center" href="/">
            <ChartColumnIncreasing className="text-primary h-6 w-6" />
            <span className="text-primary ml-2 text-2xl font-bold">
              iTrackInvest
            </span>
          </Link>
        </div>
        <Menu setActive={setActive}>
          <div className="hidden w-full lg:flex">
            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/"}>Inicio</Link>
              </li>
              {/* <li>
                <Link href={"/portfolio"}>Portfolio</Link>
              </li> */}
              <li>
                <ModeToggle />
              </li>
            </ul>
          </div>
        </Menu>

        <div className="hidden w-1/6 lg:flex justify-end">
          <UserDropdown />
        </div>
        <div className="block lg:hidden">
          <Button
            variant={"ghost"}
            onClick={handleToggleNavbar}
            className="px-0">
            <NavbarMenuButton />
          </Button>
        </div>
      </div>

      <div
        id="mobile-navbar"
        className={`fixed left-0 top-0 h-screen w-full transform transition-transform duration-150 ease-in-out lg:hidden ${
          isNavbarOpen
            ? "translate-x-0 overflow-hidden"
            : "-translate-x-full overflow-auto"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navbar-title">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 dark:bg-black sm:ring-1 sm:ring-gray-900/10">
          <div className="flex h-fit max-h-[10vh] min-h-[57px] items-center justify-between px-0 py-2 sm:px-2 md:px-4 lg:px-6">
            <span className="-m-1.5 p-1.5">
              <span className="sr-only">iTrackInvest</span>
              <div>
                <Link className="flex items-center justify-center" href="#">
                  <ChartColumnIncreasing className="text-primary h-6 w-6" />
                  <span className="text-primary ml-2 text-2xl font-bold">
                    iTrackInvest
                  </span>
                </Link>
              </div>
            </span>
            <button
              id="close-mobile-navbar"
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
              onClick={handleCloseNavbar}>
              <span className="sr-only">Close menu</span>
              <X color="red" />
            </button>
          </div>
          <div className="mt-6 flow-root text-black dark:text-white">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col">
                <ul className="navbar-ul items-left mb-6 flex flex-col gap-6 text-2xl">
                  <li>
                    <Link onClick={() => handleCloseNavbar()} href={"/"}>
                      Inicio
                    </Link>
                  </li>
                  {/* <li>
                    <Link onClick={() => handleCloseNavbar()} href={"/portfolio"}>
                      Portfolio
                    </Link>
                  </li> */}
                  <li className="hover:!bg-transparent">
                    <ModeToggle
                      buttonClasses="justify-start hover:!bg-transparent"
                      iconSize="h-[1.8rem] w-[1.8rem]"
                    />
                  </li>
                </ul>
              </div>
              <div className="p-2">
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
