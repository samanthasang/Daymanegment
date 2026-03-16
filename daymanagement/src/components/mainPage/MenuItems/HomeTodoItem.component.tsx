import { cn } from "@/lib/utils";
import Link from "next/link";

function MenuItems({
  href,
  tilte,
  infoNumber,
  className,
}: {
  href: string;
  tilte: string;
  infoNumber?: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "w-full h-fit cursor-pointer flex flex-row items-center justify-between border p-1 px-3 rounded-3xl",
        className
      )}
    >
      <span>{tilte}</span>
      {infoNumber && <span>{infoNumber}</span>}
    </Link>
  );
}

export default MenuItems;
