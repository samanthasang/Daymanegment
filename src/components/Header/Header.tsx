"use client"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const components: { title: string; href: string; description?: string }[] = [
  {
    title: "Todo",
    href: "/todo"
  },
  {
    title: "Timer",
    href: "/timer",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]
 

function Header() {
  return (
    <div className="flex flex-row w-full h-14 bg-slate-800 text-slate-200">
      <div className="w-40 h-full py-4 px-10">
        <span>logo</span>
      </div>
      <div className="flex justify-start w-max flex-grow-1">

      <NavigationMenu>
        <NavigationMenuList  className="flex gap-4">
                {components.map((component) => (
                  <NavigationMenuItem
                    key={component.title}
                  >
                    <Link
                      title={component.title}
                      href={component.href}
                      >
                      {component.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </div>
  );
}
export default Header;
