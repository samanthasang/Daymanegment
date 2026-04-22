import { cn } from "@/lib/utils";

function ListTitle({
  forgot,
  setForgot,
  title,
  listCount,
}: {
  forgot: boolean;
  setForgot: () => void;
  title: string;
  listCount?: number;
  secListCount?: number;
}) {
  return (
    <div
      className={cn(
        "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15 hover:text-card",
        forgot ? "bg-card/15 text-card" : "bg-primary text-TextForeground "
      )}
      onClick={() => setForgot()}
    >
      {title}
      {!!listCount && listCount > 0 && (
        <span className="bg-describtion py-1 px-2 ml-2 rounded-3xl">
          {listCount}
        </span>
      )}
    </div>
  );
}

export default ListTitle;
