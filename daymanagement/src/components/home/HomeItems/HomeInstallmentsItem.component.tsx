"use client";
import useInstallmentsList from "@/lib/Hooks/Lists/UseInstallmentsList.component";

function HomeInstallmentsItem() {
  const ListInstallments = useInstallmentsList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Installment</span>
      <span>{`${ListInstallments?.length}`}</span>
    </div>
  );
}

export default HomeInstallmentsItem;
