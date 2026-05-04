"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";

function HomeInstallmentsItem() {
  const { ListInstallmentsFiltered } = useInstallmentsList();

  return (
    <MenuItems
      href={"/installments"}
      tilte="Installments"
      infoNumber={`${FinishedArray(ListInstallmentsFiltered).length} / ${ListInstallmentsFiltered?.length}`}
    />
  );
}

export default HomeInstallmentsItem;
