"use client";
import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MenuMainSideBarComponent from "./MainMenuSideBar.component";
import MenuBottomSideBarComponent from "./MenuBottomSideBarComponent";

function SideBarMenu() {
  const { OpenMenu } = useAppSelector((state) => state.Menu);
  const { isSX } = useMediaQueryValues();

  return (
    <div
      className={cn(
        "bg-secondary flex flex-col justify-start items-start h-full rounded-3xl w-fit p-1.5",
        isSX || OpenMenu ? "w-[250px]" : "w-[150px]"
      )}
    >
      <div className="w-full flex justify-center items-center gap-x-2 py-2 bg-primary rounded-full">
        <Menu width={16} height={16} />
        Menu
      </div>
      <MenuMainSideBarComponent />
      <MenuBottomSideBarComponent />
    </div>
  );
}

export default SideBarMenu;
