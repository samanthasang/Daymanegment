import { cn } from "@/lib/utils";
import ListItemsIcon from "../ListSection/ListItem/ListItemsIcon.component";

function SelectedTitle({
	title,
	drawerType,
}: {
	title: string;
	drawerType?: string;
}) {
	return (
		<div className="flex justify-center items-center bg-secondary py-2 gap-y-2 rounded-3xl">
			{drawerType && ListItemsIcon(drawerType, 16)}
			{title}
		</div>
	);
}

export default SelectedTitle;
