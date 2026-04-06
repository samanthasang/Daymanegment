"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import VisitListActivities from "@/lib/Hooks/Lists/Visit/VisitListActivities.component";
import {
  TVisit
} from "@/modules/visitsList/visit.slice";

export const VisitsItem = ({
  item,
  selectedID,
}: {
  item: TVisit;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId } = VisitListActivities();

  return (
    <ListItem
      id={item.id}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.date}
      drawerType="VisitsList"
      formType="Edit Visit"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title)}
    />
  );
};

export default VisitsItem;
