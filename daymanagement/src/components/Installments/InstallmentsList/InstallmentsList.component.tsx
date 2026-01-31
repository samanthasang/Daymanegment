"use client";
import { cn } from "@/lib/utils";
import InstallmentsItem from "../InstallmentsItem/Installments.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import useInstallmentsList from "@/lib/Hooks/Lists/UseInstallmentsList.component";

function InstallmentsList() {
  const ListInstallments = useInstallmentsList();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 col-span-2 h-auto",
        ListInstallments && ListInstallments.length !== 0
          ? "scroll-m-0 overflow-y-scroll"
          : ""
      )}
    >
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {ListInstallments?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          ListInstallments?.map((li: TInstallmentsts) => (
            <InstallmentsItem key={li.id} item={li} />
          ))
        )}
      </div>
    </div>
  );
}

export default InstallmentsList;
