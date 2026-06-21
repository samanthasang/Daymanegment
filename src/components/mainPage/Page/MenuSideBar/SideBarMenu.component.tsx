"use client";
import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MenuMainSideBarComponent from "./MainMenuSideBar.component";
import MenuBottomSideBarComponent from "./MenuBottomSideBarComponent";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function SideBarMenu() {
	const { OpenMenu } = useAppSelector((state) => state.Menu);
	const { isSX } = useMediaQueryValues();
	const t: any = UseLangComponent("Menu");
	return (
		<div
			className={cn(
				"flex flex-col justify-start items-start h-full rounded-3xl w-fit p-0.5 gap-y-2",
				isSX || OpenMenu ? "w-62.5" : "w-37.5",
			)}
		>
			<div className="bg-secondary w-full flex justify-center items-center gap-x-2 py-2 rounded-full">
				<Menu width={16} height={16} />
				{/* {t("menuTitle")} */}
				{t.menuTitle}
			</div>
			<MenuMainSideBarComponent />
			<MenuBottomSideBarComponent />
		</div>
	);
}

export default SideBarMenu;
