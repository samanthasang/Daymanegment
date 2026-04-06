import { cn } from "@/lib/utils";
import FilterComponent from "../../Filter/FilterComponent";
import { Filter } from "@/components/icons";

function SidebarFilter({ witDate = true }: { witDate?: boolean }) {
  return (
    <div className="relative bg-secondary min-w-[320px] w-fit flex flex-col justify-start items-start h-full rounded-3xl p-1">
      <div className="w-full flex justify-center items-center gap-x-2 py-2 bg-primary rounded-full">
        <Filter />
        Filter
      </div>
      <div className="bg-secondary w-full flex flex-col gap-y-3 justify-start items-center h-full rounded-2xl py-1">
        <FilterComponent witDate={witDate} />
      </div>
    </div>
  );
}

export default SidebarFilter;
