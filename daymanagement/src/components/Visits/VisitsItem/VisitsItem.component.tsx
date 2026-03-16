"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeVisitList,
  delVisitList,
  selectVisitList,
  TVisit,
} from "@/modules/visitsList/visit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const VisitsItem = ({
  item,
  selectedID,
}: {
  item: TVisit;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectToDoList = () => {
    dispatch(selectVisitList(item.id));
  };
  const DelToDoList = () => {
    dispatch(delVisitList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteToDoList = () => {
    dispatch(completeVisitList(item.id));
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
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
      SelectItem={SelectToDoList}
      DelItem={DelToDoList}
      CompleteItemt={CompleteToDoList}
    />
  );
};

export default VisitsItem;
