import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { changeFilterStatuse } from "@/modules/menu/menu.slice";
import duration from "dayjs/plugin/duration";
import ListItemCatTag from "./ListItemCatTag.component";
import ListItemDetails from "./ListItemDetails.component";
import ListItemTitle from "./ListItemTitle.component";

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
  total,
  hasShare,
  priceOfProduct,
  drawerType,
  withDel = true,
  selectedID,
  SelectItem,
  DelItem,
  CompleteItem,
  UpdateItem,
}: {
  selectedID?: string;
  id?: string;
  priority?: string;
  title: string;
  category?: string;
  incomeAmount?: string;
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
        "w-full h-fit cursor-pointer flex flex-row gap-y-2 justify-center items-center p-3 rounded-3xl hover:bg-card/15",
        selectedID == id ? "bg-card/15" : "bg-secondary"
      )}
    >
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
          total={total}
          priceOfProduct={priceOfProduct}
          DelItem={DelItem}
          CompleteItem={CompleteItem}
          UpdateItem={UpdateItem}
        />
      )}
    </div>
  );
};

export default ListItem;
