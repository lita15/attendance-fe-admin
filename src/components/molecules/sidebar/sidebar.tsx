"use client";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { MenuItem } from "./type";
import { menuItems } from "./constant";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../../../public/logo-usg.png";
import Image from "next/image";

export const Sidebar = memo(() => {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk hamburger menu

  const toggleSubMenu = (menuLabel: string) => {
    if (selectedMenus.includes(menuLabel)) {
      setSelectedMenus(selectedMenus.filter((label) => label !== menuLabel));
    } else {
      setSelectedMenus([...selectedMenus, menuLabel]);
    }
  };

  const { asPath } = useRouter();

  useEffect(() => {
    menuItems.map((menuItem: any) => {
      if (menuItem?.href && asPath === menuItem.href) {
        setSelectedMenus([...selectedMenus, menuItem.label]);
      }
      if (menuItem.subMenu) {
        menuItem.subMenu.map((item: any) => {
          if (item?.href && asPath.includes(item.href as string)) {
            setSelectedMenus([...selectedMenus, menuItem.label]);
          }
        });
      }
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar ketika hamburger di-klik
  };

  return (
    <>
      {/* Hamburger icon */}
      <button
        className="md:hidden fixed top-7 left-8 z-50"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <section className="h-full scrollbar-hide overflow-y-auto bg-sidebar">
          <Link
            href="/"
            className="font-bold sticky top-0 bg-[#498AD4] text-xl grid place-items-center h-[4.5rem] z-50 overflow-hidden object-cover "
          >
            <Image src={Logo} width={150} alt={"logo"} />
          </Link>
          <ul className="font-medium text-white">
            {menuItems.map((menuItem, index) => (
              <li key={index} className="w-full items-center cursor-pointer">
                {menuItem.href ? (
                  <Link
                    passHref
                    className={`hover:bg-[#252525] transition-colors ease-in-out min-w-full block px-8 py-4 font-medium ${
                      selectedMenus.includes(menuItem.label)
                        ? "bg-[#252525]"
                        : ""
                    }`}
                    href={menuItem.href}
                  >
                    {menuItem.label}
                  </Link>
                ) : (
                  <section
                    className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors ease-in-out min-w-full font-medium px-8 py-4"
                    onClick={() => toggleSubMenu(menuItem.label)}
                  >
                    <span>{menuItem.label}</span>
                  </section>
                )}
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Overlay (optional) to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
});

const renderSubMenu = (subMenu?: MenuItem[]) => {
  const { asPath } = useRouter();

  return (
    <section className="pb-2 mb-1 border-b-[1px] border-b-[#A6A6A6] bg-[#252525]">
      {subMenu?.map((item, index) => (
        <section
          key={index}
          className={`px-10 py-1.5 cursor-pointer hover:bg-[#181818] transition-colors text-sm ease-in-out ${
            asPath.includes(item.href as string) ? "bg-[#181818]" : ""
          }`}
        >
          <Link passHref href={item.href as string} className="w-full block">
            {item.label}
          </Link>
          {item.subMenu && renderSubMenu(item.subMenu)}
        </section>
      ))}
    </section>
  );
};
