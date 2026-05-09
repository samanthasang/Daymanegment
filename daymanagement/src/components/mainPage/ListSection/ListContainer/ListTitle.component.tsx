import { cn } from "@/lib/utils";
import ListItemsIcon from "../ListItem/ListItemsIcon.component";

function ListTitle({
  forgot,
  setForgot,
  title,
  listCount,
  drawerType,
}: {
  forgot: boolean;
  setForgot?: () => void;
  title: string;
  listCount?: number;
  secListCount?: number;
  drawerType?: string;
}) {
  return (
    <div
      className={cn(
        "cursor-pointer flex justify-center items-center gap-x-1 w-full text-center py-1 rounded-3xl hover:text-card",
        forgot ? "bg-card/15 text-card" : "bg-primary text-TextForeground "
      )}
      onClick={() => setForgot && setForgot()}
    >
      {drawerType && ListItemsIcon(drawerType, 16)}
      {title}
      {!!listCount && listCount > 0 && (
        <span className="bg-describtion h-6 min-w-6 w-fit text-center rounded-3xl">
          {listCount}
        </span>
      )}
    </div>
  );
}

export default ListTitle;
