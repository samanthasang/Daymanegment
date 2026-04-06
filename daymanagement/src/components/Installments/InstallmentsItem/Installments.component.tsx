"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";

export const InstallmentsItem = ({
  item,
  selectedID,
}: {
  item: TInstallmentsts;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId, CompleteItemInstallment } =
    InstallmentsListActivities();

  const lastItem =
    item.installmentstList.filter((ins) => !ins.isComplete).length != 0
      ? item.installmentstList.filter((ins) => !ins.isComplete)[0]
      : item.installmentstList[item.installmentstList.length - 1];

  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      insstallmentIsComplete={lastItem && lastItem.isComplete}
      date={(lastItem && lastItem.date) || item.lastUpdate}
      drawerType="InstallmentsList"
      formType="Edit Installment"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title, item.startDate)}
      UpdateItem={() => CompleteItemInstallment(item.id, item.title)}
    />
  );
};

export default InstallmentsItem;
