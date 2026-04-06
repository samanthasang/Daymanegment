import { cn } from "@/lib/utils";

function ListTitle({
  forgot,
  setForgot,
  title,
  titleSec,
  listCount,
  secListCount,
}: {
  forgot: boolean;
  setForgot: (forget: boolean) => void;
  title: string;
  titleSec?: string;
  listCount?: number;
  secListCount?: number;
}) {
  return (
    <div className="w-full flex justify-center items-center gap-x-2 p-1 bg-primary rounded-full">
      <div
        className={cn(
          "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15 ",
          !forgot
            ? "bg-card/15 text-card"
            : "text-TextForeground hover:text-white"
        )}
        onClick={() => setForgot(false)}
      >
        {title}
        {!!listCount && listCount > 0 && (
          <span className="bg-describtion py-1 px-2 ml-2 rounded-3xl">
            {listCount}
          </span>
        )}
      </div>
      <div
        className={cn(
          "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
          forgot
            ? "bg-card/15 text-card"
            : "text-TextForeground hover:text-white"
        )}
        onClick={() => setForgot(true)}
      >
        {titleSec ? titleSec : `Old ${title}`}
        {!!secListCount && secListCount > 0 && (
          <span className="bg-describtion py-1 px-2 ml-2 rounded-3xl">
            {secListCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default ListTitle;
