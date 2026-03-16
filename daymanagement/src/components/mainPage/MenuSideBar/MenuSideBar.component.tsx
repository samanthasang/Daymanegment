"use client";
import { AccountBalance } from "@/components/icons";
import { useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SidebarContainer from "../sidebarContainer/sidebarContainer.componen";
import MenuBottomSideBarComponent from "./MenuBottomSideBarComponent";
import MenuMainSideBarComponent from "./MainMenuSideBar.component";

function MenuSideBarComponent({ witDate }: { witDate?: boolean }) {
  const { OpenFilter, OpenMenu } = useAppSelector((state) => state.Menu);

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-row gap-3 h-full relative w-fit",
        OpenMenu || OpenFilter
          ? OpenMenu && !OpenFilter
            ? "w-3/12"
            : !OpenMenu && OpenFilter
              ? "w-4/12"
              : "w-5/12"
          : "w-1/12"
      )}
    >
      <div
        className={cn(
          "relative bg-secondary flex flex-col justify-start items-start h-full rounded-3xl",
          OpenMenu ? "col-span-2 w-full" : "col-span-1 w-fit"
        )}
      >
        <div
          className={cn(
            "w-full flex justify-center items-center gap-x-2 text-center p-2 border-b-2 border-[#1C2936]",
            OpenMenu ? "w-full" : "w-fit"
          )}
        >
          <AccountBalance />
          Menu
        </div>
        <MenuMainSideBarComponent pathname={pathname} OpenMenu={OpenMenu} />
        <MenuBottomSideBarComponent
          OpenFilter={OpenFilter}
          OpenMenu={OpenMenu}
        />
      </div>
      {OpenFilter && (
        <SidebarContainer
          drawerType="TodoList"
          formType="Add Todo"
          witDate={witDate}
        />
      )}
    </div>
  );
}

export default MenuSideBarComponent;
