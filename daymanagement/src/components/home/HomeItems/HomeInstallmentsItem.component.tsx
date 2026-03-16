"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";

function HomeInstallmentsItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListInstallments = useInstallmentsList();

  return (
    <MenuItems
      href={"/installments"}
      tilte="Installment"
      className={
        pathname && pathname.startsWith("/installments") ? "bg-primary" : ""
      }
      infoNumber={OpenMenu ? `${ListInstallments?.length}` : ""}
    />
  );
}

export default HomeInstallmentsItem;
