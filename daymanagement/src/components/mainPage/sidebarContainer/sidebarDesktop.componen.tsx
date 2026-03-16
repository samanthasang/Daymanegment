import { cn } from "@/lib/utils";
import FilterComponent from "../../Filter/FilterComponent";

function SidebarDesktop({
  drawerType,
  formType,
  witDate = true,
  witAdd = true,
}: {
  drawerType: string;
  formType: string;
  witDate: boolean;
  witAdd?: boolean;
}) {
  return (
    <div className="relative flex flex-col justify-center flex-1 h-full rounded-2xl bg-secondary">
      <div className="w-full text-center p-2 border-b-2 border-[#1C2936]">
        Filter
      </div>
      <div className="h-full px-2">
        <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
          <FilterComponent witDate={witDate} />
        </div>
      </div>
    </div>
  );
}

export default SidebarDesktop;
