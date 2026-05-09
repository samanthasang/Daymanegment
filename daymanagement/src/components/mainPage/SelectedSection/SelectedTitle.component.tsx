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
    <div className="flex justify-center items-center gap-x-1 w-full px-1 py-2 rounded-3xl bg-card/15 text-card">
      {drawerType && ListItemsIcon(drawerType, 16)}
      {title}
    </div>
  );
}

export default SelectedTitle;
