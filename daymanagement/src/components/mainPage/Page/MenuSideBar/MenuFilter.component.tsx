import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Filter } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  changeFilterStatuse,
  changeMenuStatuse,
} from "@/modules/menu/menu.slice";

function MenuFilter() {
  const { OpenMenu, OpenFilter } = useAppSelector((state) => state.Menu);

  const { isMDMax, isMDMin, isLGMax } = useMediaQueryValues();
  const dispatch = useAppDispatch();

  return isMDMax ? (
    <DrawerButton drawerType="FilterList" formType="Info">
      <Filter />
    </DrawerButton>
  ) : (
    <div
      onClick={() => {
        isMDMin && isLGMax && OpenMenu && dispatch(changeMenuStatuse());
        dispatch(changeFilterStatuse());
      }}
      className={cn(
        "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
        OpenFilter ? "bg-button" : "bg-primary"
      )}
    >
      <Filter />
    </div>
  );
}

export default MenuFilter;
