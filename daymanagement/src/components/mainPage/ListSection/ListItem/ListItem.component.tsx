import { Task } from "@/components/icons";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { changeFilterStatuse } from "@/modules/menu/menu.slice";
import duration from "dayjs/plugin/duration";
import ListItemCatTag from "./ListItemCatTag.component";
import ListItemDetails from "./ListItemDetails.component";
import ListItemTitle from "./ListItemTitle.component";
import ListItemsIcon from "./ListItemsIcon.component";

export const ListItem = ({
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  isFinish,
  nextDate,
  date,
  diff,
  score,
  incomeAmount,
  outcomeAmount,
  total,
  hasShare,
  priceOfProduct,
  drawerType,
  withDel = true,
  selectedID,
  SelectItem,
  DelItem,
  CompleteItem,
  BringToday,
  UpdateItem,
}: {
  selectedID?: string;
  id?: string;
  priority?: string;
  title: string;
  category?: string;
  incomeAmount?: string;
  outcomeAmount?: string;
  priceOfProduct?: string;
  tag?: string;
  isComplete?: boolean;
  isFinish?: boolean;
  nextDate?: string;
  withDel?: boolean;
  date?: string | number;
  diff?: duration.Duration;
  score?: number;
  total?: number;
  hasShare?: boolean;
  drawerType: string;
  SelectItem?: () => void;
  DelItem?: () => void;
  CompleteItem?: () => void;
  BringToday?: () => void;
  UpdateItem?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { OpenFilter } = useAppSelector((state) => state.Menu);

  const { isSX, isMDMax, isSMMin, isLGMin, isLGMax } = useMediaQueryValues();

  const showDetails =
    isSX ||
    (isSMMin && isMDMax && !selectedID) ||
    (isLGMin && (!OpenFilter || !selectedID));

  return (
    <div
      onClick={() => {
        isLGMax && OpenFilter && dispatch(changeFilterStatuse());
        id && SelectItem && SelectItem();
      }}
      className={cn(
        "w-full h-fit cursor-pointer flex flex-rowjustify-start items-center gap-x-2 p-2 rounded-3xl hover:bg-card/15",
        selectedID == id ? "bg-card/15" : "bg-secondary"
      )}
    >
      {drawerType && ListItemsIcon(drawerType)}
      <div className="flex flex-row items-center gap-x-1 flex-1">
        <div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
          <ListItemTitle
            title={title}
            incomeAmount={incomeAmount}
            priceOfProduct={priceOfProduct}
            priority={priority}
          />
          <ListItemCatTag
            id={id}
            tag={tag}
            category={category}
            hasShare={drawerType == "PeopleList" && hasShare}
          />
        </div>
        {showDetails && (
          <ListItemDetails
            id={id}
            title={title}
            isComplete={isComplete}
            isFinish={isFinish}
            nextDate={nextDate}
            date={date}
            score={score}
            hasShare={hasShare}
            drawerType={drawerType}
            withDel={withDel}
            diff={diff}
            incomeAmount={incomeAmount}
            outcomeAmount={outcomeAmount}
            total={total}
            priceOfProduct={priceOfProduct}
            DelItem={DelItem}
            CompleteItem={CompleteItem}
            BringToday={BringToday}
            UpdateItem={UpdateItem}
          />
        )}
      </div>
    </div>
  );
};

export default ListItem;
