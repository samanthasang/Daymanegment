import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import { cn } from "@/lib/utils";

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
        "flex flex-col h-full gap-y-2 mt-1",
        ListCount && ListCount > 5 ? "scroll-m-0 overflow-y-scroll" : ""
      )}
    >
      {ListCount && ListCount != 0 ? children : <EmptyList />}
    </div>
  );
}

export default ListContent;
