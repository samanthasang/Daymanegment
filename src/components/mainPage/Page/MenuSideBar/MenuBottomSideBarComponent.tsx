import MenuButton from "./MenuButton.component";
import MenuFilter from "./MenuFilter.component";
import MenuToday from "./MenuToday.component";

function MenuBottomSideBarComponent() {
  return (
    <div className="flex justify-around w-full gap-x-1">
      <MenuToday />
      <MenuFilter />
      <MenuButton />
    </div>
  );
}

export default MenuBottomSideBarComponent;
