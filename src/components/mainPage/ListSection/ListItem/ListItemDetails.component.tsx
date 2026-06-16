import duration from "dayjs/plugin/duration";
import ListItemActions from "./ListItemActions.component";
import ListItemInfo from "./ListItemInfo.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";

export const ListItemDetails = ({
  id,
  title,
  isComplete,
  isFinish,
  isPause,
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
  DelItem,
  CompleteItem,
  BringToday,
  UpdateItem,
}: {
  id?: string;
  title: string;
  incomeAmount?: string;
  outcomeAmount?: string;
  priceOfProduct?: string;
  isComplete?: boolean;
  isFinish?: boolean;
  isPause?: boolean;
  withDel?: boolean;
  date?: string | number;
  diff?: duration.Duration;
  score?: number;
  total?: number;
  hasShare?: boolean;
  drawerType: string;
  DelItem?: () => void;
  CompleteItem?: () => void;
  BringToday?: () => void;
  UpdateItem?: () => void;
}) => {
  return (
    <div className="flex flex-col w-fit gap-y-1 justify-end items-end">
      <ListItemActions
        isComplete={isComplete}
        isFinish={isFinish}
        isPause={isPause}
        score={score}
        hasShare={hasShare}
        drawerType={drawerType}
        withDel={withDel}
        isToday={(date && DayUnixDiff(+date, "day") == 0) || false}
        DelItem={DelItem}
        CompleteItem={CompleteItem}
        BringToday={BringToday}
        UpdateItem={UpdateItem}
      />
      <ListItemInfo
        isComplete={isComplete}
        date={date}
        diff={diff}
        score={score}
        incomeAmount={incomeAmount}
        outcomeAmount={outcomeAmount}
        total={total}
        hasShare={hasShare}
        priceOfProduct={priceOfProduct}
        drawerType={drawerType}
      />
    </div>
  );
};

export default ListItemDetails;
