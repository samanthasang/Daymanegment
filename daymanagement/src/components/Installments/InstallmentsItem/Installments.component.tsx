"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";

export const InstallmentsItem = ({ item }: { item: TInstallmentsts }) => {
  const { CompleteItem, DelItem, SelectWithId, CompleteItemInstallment } =
    InstallmentsListActivities();

  const { selectedInstallmentstList } = useInstallmentsList();

  const instalmentNotComplete =
    item.installmentstList &&
    item.installmentstList.filter((ins) => !ins.isComplete);

  const lastInstalment =
    (item.installmentstList &&
      item.installmentstList.length > 0 &&
      item.installmentstList[item.installmentstList.length - 1].doDate) ||
    item.completeUpdate;

  const firstNOtComplete =
    instalmentNotComplete && instalmentNotComplete?.length > 0
      ? instalmentNotComplete[0].doDate
      : lastInstalment;

  const secondNOtComplete =
    instalmentNotComplete && instalmentNotComplete?.length > 0
      ? instalmentNotComplete[1].doDate
      : lastInstalment;

  return (
    <ListItem
      date={item.doDate}
      drawerType="Installments"
      selectedID={selectedInstallmentstList && selectedInstallmentstList.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() =>
        CompleteItem(item.id, item.title, firstNOtComplete, secondNOtComplete)
      }
      UpdateItem={() => CompleteItemInstallment(item.id, item.title)}
      {...item}
    />
  );
};

export default InstallmentsItem;
