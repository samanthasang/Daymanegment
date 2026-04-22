import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import MenuButton from "./MenuButton.component";
import MenuFilter from "./MenuFilter.component";
import MenuToday from "./MenuToday.component";

function MenuBottomSideBarComponent() {
  const { isSX } = useMediaQueryValues();

  return (
    <div
      className={cn(
        "flex justify-around w-full mx-auto p-1.5 absolute bottom-0 left-0 right-0 gap-x-1",
        isSX ? "relative mt-3" : "absolute"
      )}
    >
      <MenuToday />
      <MenuFilter />
      <MenuButton />
    </div>
  );
}

export default MenuBottomSideBarComponent;
