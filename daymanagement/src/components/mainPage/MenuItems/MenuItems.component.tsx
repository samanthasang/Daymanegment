import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuItems({
  href,
  tilte,
  infoNumber,
}: {
  href: string;
  tilte: string;
  infoNumber?: string;
}) {
  const { OpenMenu } = useAppSelector((state) => state.Menu);
  const pathname = usePathname();
  const { isSX } = useMediaQueryValues();
  return (
    <Link
      href={href}
      className={cn(
        "w-full h-fit cursor-pointer flex flex-row items-center justify-between py-1 px-3 rounded-3xl hover:bg-card/15",
        pathname && pathname.startsWith(href) ? "bg-card/15 text-card" : ""
      )}
    >
      <span>{tilte}</span>
      {(isSX || OpenMenu) && infoNumber && <span>{infoNumber}</span>}
    </Link>
  );
}

export default MenuItems;
