"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { Thabbit } from "@/modules/habbitList/habbit.slice";

export const HabbitItem = ({
  item,
  selectedID,
}: {
  item: Thabbit;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId } = SelectHabbitListActivities();

  return (
    <ListItem
      isComplete={
        DayUnixFormat(+item.completeUpdate, "DD") == DayUnixFormatNow("DD")
      }
      drawerType="HabbitList"
      formType="Edit Habbit"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title)}
      {...item}
    />
  );
};

export default HabbitItem;
