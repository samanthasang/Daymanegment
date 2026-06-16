import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ListItemsIcon from "../../ListSection/ListItem/ListItemsIcon.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function MenuItems({
  href,
  title,
  infoNumber,
}: {
  href: string;
  title: string;
  infoNumber?: string;
}) {
  const { OpenMenu } = useAppSelector((state) => state.Menu);
  const pathname = usePathname();
  const { isSX } = useMediaQueryValues();
  const t: any = UseLangComponent(
    title as
      | "Todos"
      | "Reminders"
      | "Habits"
      | "Timers"
      | "Transactions"
      | "Friends"
      | "Visits"
      | "Goals"
      | "Shares"
      | "CategoryList"
      | "TagList"
      | "Menu"
      | "Form"
      | "Drawer"
  );
  return (
    <Link
      href={href}
      className={cn(
        "w-full h-fit cursor-pointer flex flex-row items-center justify-between py-1 px-3 rounded-3xl hover:bg-card/15",
        pathname && pathname.startsWith(href) ? "bg-card/15 text-card" : ""
      )}
    >
      <div className="flex items-center gap-x-1">
        {title && ListItemsIcon(title, 16)}
        <span>{t?.title || title}</span>
      </div>
      {(isSX || OpenMenu) && infoNumber && <span>{infoNumber}</span>}
    </Link>
  );
}

export default MenuItems;
