"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";

function HomeInstallmentsItem() {
  const { ListInstallmentsFiltered } = useInstallmentsList();

  return (
    <MenuItems
      href={"/installments"}
      tilte="Installment"
      infoNumber={`${ListInstallmentsFiltered?.filter((todo) => todo.isComplete == true).length} / ${ListInstallmentsFiltered?.length}`}
    />
  );
}

export default HomeInstallmentsItem;
