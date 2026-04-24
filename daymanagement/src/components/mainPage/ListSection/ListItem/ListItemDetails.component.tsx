import duration from "dayjs/plugin/duration";
import ListItemActions from "./ListItemActions.component";
import ListItemInfo from "./ListItemInfo.component";

export const ListItemDetails = ({
  id,
  title,
  isComplete,
  isFinish,
  nextDate,
  date,
  diff,
  score,
  highest,
  incomeAmount,
  total,
  hasShare,
  priceOfProduct,
  drawerType,
  withDel = true,
  DelItem,
  CompleteItem,
  UpdateItem,
}: {
  id?: string;
  title: string;
  incomeAmount?: string;
  priceOfProduct?: string;
  isComplete?: boolean;
  isFinish?: boolean;
  nextDate?: string;
  withDel?: boolean;
  date?: string | number;
  diff?: duration.Duration;
  score?: number;
  highest?: number;
  total?: number;
  hasShare?: boolean;
  drawerType: string;
  DelItem?: () => void;
  CompleteItem?: () => void;
  UpdateItem?: () => void;
}) => {
  return (
    <div className="flex flex-col w-fit gap-y-1 justify-end items-end">
      <ListItemActions
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
        DelItem={DelItem}
        CompleteItem={CompleteItem}
        UpdateItem={UpdateItem}
      />
      <ListItemInfo
        isComplete={isComplete}
        date={date}
        diff={diff}
        score={score}
        incomeAmount={incomeAmount}
        total={total}
        hasShare={hasShare}
        priceOfProduct={priceOfProduct}
        drawerType={drawerType}
      />
    </div>
  );
};

export default ListItemDetails;
