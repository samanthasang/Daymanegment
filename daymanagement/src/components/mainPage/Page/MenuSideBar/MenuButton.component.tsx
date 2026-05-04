import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Button } from "@/components/ui/button";
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
    <Button
      onClick={() => {
        isSMMax && isLGMax && OpenFilter && dispatch(changeFilterStatuse());
        dispatch(changeMenuStatuse());
      }}
      variant="default"
      className={cn("flex-1", OpenMenu ? "bg-button" : "bg-primary")}
    >
      <Menu
        width={16}
        height={16}
        className={OpenMenu ? "text-errorRed" : "text-white"}
      />
    </Button>
  );
}

export default MenuButton;
