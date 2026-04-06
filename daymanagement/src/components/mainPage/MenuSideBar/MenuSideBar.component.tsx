"use client";
import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import SidebarFilter from "../sidebarContainer/sidebarDesktop.componen";
import SideBarMenu from "./SideBarMenu.component";

function MenuSideBarComponent({ witDate }: { witDate?: boolean }) {
  const { OpenFilter } = useAppSelector((state) => state.Menu);
  const { isSX, isMDMin } = useMediaQueryValues();

  return (
    isMDMin && (
      <div
        className={cn(
          "flex flex-row gap-x-3 h-full relative w-fit",
          !isSX ? "w-fit" : "w-full"
        )}
      >
        <SideBarMenu />
        {OpenFilter && <SidebarFilter witDate={witDate} />}
      </div>
    )
  );
}

export default MenuSideBarComponent;
