import { cn } from "@/lib/utils";

function ListTitle({
  forgot,
  setForgot,
  title,
}: {
  forgot: boolean;
  setForgot: (forget: boolean) => void;
  title: string;
}) {
  return (
    <div className="flex justify-between mb-1">
      <div
        className={cn(
          "cursor-pointer w-full text-center py-2 rounded-2xl",
          !forgot ? "bg-primary" : ""
        )}
        onClick={() => setForgot(false)}
      >
        {title}
      </div>
      <div
        className={cn(
          "cursor-pointer w-full text-center py-2 rounded-2xl",
          forgot ? "bg-primary" : ""
        )}
        onClick={() => setForgot(true)}
      >
        Old {title}
      </div>
    </div>
  );
}

export default ListTitle;
