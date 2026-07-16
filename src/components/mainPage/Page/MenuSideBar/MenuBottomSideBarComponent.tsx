import MenuButton from "./MenuButton.component";
import MenuFilter from "./MenuFilter.component";
import MenuToday from "./MenuToday.component";

function MenuBottomSideBarComponent() {
	return (
		<div className="flex justify-around w-full items-center gap-x-1 bg-secondary p-1.25 gap-y-2 rounded-3xl">
			<MenuToday />
			<MenuFilter />
			<MenuButton />
		</div>
	);
}

export default MenuBottomSideBarComponent;
