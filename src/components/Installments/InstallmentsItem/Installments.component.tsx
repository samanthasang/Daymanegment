"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";

export const InstallmentsItem = ({ item }: { item: TInstallmentsts }) => {
  const { CompleteItem, DelItem, SelectWithId } = InstallmentsListActivities();

  const { selectedInstallmentstList } = useInstallmentsList();

  return (
    <ListItem
      date={item.doDate}
      drawerType="Installments"
      selectedID={selectedInstallmentstList && selectedInstallmentstList.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={() =>
        DelItem(selectedInstallmentstList.id, selectedInstallmentstList.title)
      }
      CompleteItem={() =>
        CompleteItem(
          selectedInstallmentstList.id,
          selectedInstallmentstList.title
        )
      }
      {...item}
    />
  );
};

export default InstallmentsItem;
