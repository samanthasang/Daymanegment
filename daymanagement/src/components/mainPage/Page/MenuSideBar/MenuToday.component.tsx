import { EventAvailable } from "@/components/icons";
import { useAppSelector } from "@/lib/hook";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MenuToday() {
  const { OpenMenu } = useAppSelector((state) => state.Menu);
  const pathname = usePathname();
  const { isSMMax } = useMediaQueryValues();

  return (
    (isSMMax || OpenMenu) && (
      <Link
        href={"/"}
        className={cn(
          "flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer",
          pathname && pathname.startsWith("/") ? "bg-button" : "bg-primary"
        )}
      >
        <EventAvailable />
      </Link>
    )
  );
}

export default MenuToday;
