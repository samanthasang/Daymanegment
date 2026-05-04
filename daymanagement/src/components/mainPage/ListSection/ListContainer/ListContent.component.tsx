import { cn } from "@/lib/utils";
import EmptyList from "../EmptyList/EmptyList.component";

function ListContent({
  ListCount,
  children,
}: {
  ListCount?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-2 h-ull flex-1 rounded-3xl",
        ListCount && ListCount > 5 ? "scroll-m-0 overflow-y-scroll" : ""
      )}
    >
      {ListCount && ListCount != 0 ? children : <EmptyList />}
    </div>
  );
}

export default ListContent;
