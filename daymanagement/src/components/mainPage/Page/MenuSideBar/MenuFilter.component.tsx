"use client";
import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  changeFilterStatuse,
  changeMenuStatuse,
} from "@/modules/menu/menu.slice";
import { FilterIcon } from "lucide-react";

function MenuFilter() {
  const { OpenMenu, OpenFilter } = useAppSelector((state) => state.Menu);

  const { isMDMax, isMDMin, isLGMax } = useMediaQueryValues();
  const dispatch = useAppDispatch();

  return isMDMax ? (
    <DrawerButton
      drawerType="FilterList"
      formType="Info"
      className="flex-1"
      drawerTitle="Filter"
    >
      <FilterIcon />
    </DrawerButton>
  ) : (
    <Button
      onClick={() => {
        isMDMin && isLGMax && OpenMenu && dispatch(changeMenuStatuse());
        dispatch(changeFilterStatuse());
      }}
      variant="default"
      className={cn("flex-1", OpenFilter ? "bg-button" : "bg-primary")}
    >
      <FilterIcon
        width={16}
        height={16}
        className={OpenFilter ? "fill-errorRed" : "bg-transparent"}
      />
    </Button>
  );
}

export default MenuFilter;
