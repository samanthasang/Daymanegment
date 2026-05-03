import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  changeFilterStatuse,
  changeMenuStatuse,
} from "@/modules/menu/menu.slice";
import { Menu } from "lucide-react";

function MenuButton() {
  const { OpenFilter, OpenMenu } = useAppSelector((state) => state.Menu);

  const { isSMMax, isLGMax } = useMediaQueryValues();
  const dispatch = useAppDispatch();

  return isSMMax ? (
    <DrawerButton drawerType="MenuList" formType={"Info"}>
      <Menu />
    </DrawerButton>
  ) : (
    <div
      onClick={() => {
        isSMMax && isLGMax && OpenFilter && dispatch(changeFilterStatuse());
        dispatch(changeMenuStatuse());
      }}
      className={cn(
        "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
        OpenMenu ? "bg-button" : "bg-primary"
      )}
    >
      <Menu className={OpenMenu ? "text-errorRed" : "text-white"} />
    </div>
  );
}

export default MenuButton;
