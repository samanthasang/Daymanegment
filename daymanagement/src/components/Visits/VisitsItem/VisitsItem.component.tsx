"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import VisitListActivities from "@/lib/Hooks/Lists/Visit/VisitListActivities.component";
import { TVisit } from "@/modules/visitsList/visit.slice";

export const VisitsItem = ({ item }: { item: TVisit }) => {
  const { CompleteItem, DelItem, SelectWithId } = VisitListActivities();
  const { selectedVisit } = useVisitList();

  return (
    <ListItem
      date={item.doDate}
      drawerType="Visits"
      selectedID={selectedVisit && selectedVisit.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={() => DelItem(item.id, item.title)}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      {...item}
    />
  );
};

export default VisitsItem;
