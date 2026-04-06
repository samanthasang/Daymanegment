import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import {
  AccountBalance,
  CheckCircle,
  Done,
  DoneAll,
  Edit,
  ShoppingCart,
  Trash,
} from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DayUnixDiff,
  DayUnixFormat,
  DayUnixFormatNow,
} from "@/lib/Hooks/UseDayJS";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { changeFilterStatuse } from "@/modules/menu/menu.slice";
import { selectPeopleList } from "@/modules/people/PeopleList.slice";
import duration from "dayjs/plugin/duration";
import ListPriority from "../ListPriority/ListPriority.component";
import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";
import ListItemShare from "./ListItemShareItem.component";
import ListItemTimeDiff from "./ListItemTimeDiff.component";
import SwitchComponent from "@/components/FormItem/SwitchComponent";

export const ListItem = ({
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  insstallmentIsComplete,
  date,
  diff,
  score,
  incomeAmount,
  numberOfProduct,
  total,
  hasShare,
  priceOfProduct,
  drawerType,
  formType,
  withDel = true,
  selectedID,
  SelectItem,
  DelItem,
  CompleteItemt,
  UpdateItem,
}: {
  selectedID?: string;
  id?: string;
  priority?: string;
  title: string;
  category?: string;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  tag?: string;
  isComplete?: boolean;
  insstallmentIsComplete?: boolean;
  withDel?: boolean;
  date?: string;
  diff?: duration.Duration;
  score?: number;
  total?: number;
  hasShare?: boolean;
  drawerType: string;
  formType: string;
  SelectItem?: () => void;
  DelItem?: () => void;
  CompleteItemt?: () => void;
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
        <div className="select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
          <label className={`h-8 flex justify-center items-center gap-2`}>
            {priority && <ListPriority priority={priority} />}
            {incomeAmount && <AccountBalance />}
            {priceOfProduct && <ShoppingCart />}
            {title || ""}
          </label>
        </div>
        {(category || tag) && (
          <div className="flex flex-row select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
            {category && <ListCategorySelected category={category} />}
            {tag && <ListTagSelected tag={tag} />}
          </div>
        )}
        {drawerType == "PeopleList" && hasShare && (
          <ListItemShare peopleId={id} />
        )}
      </div>
      {showDetails && (
        <div className="flex flex-col w-fit gap-y-1 justify-end items-end">
          <div className="flex flex-row gap-x-2 items-center">
            {withDel && DelItem && (
              <div
                onClick={(e) => {
                  e && e.preventDefault();
                  e && e.stopPropagation();
                  e &&
                    !(hasShare || (score == 0 && score)) &&
                    !isComplete &&
                    DelItem();
                }}
                className={`flex justify-center items-center h-8 w-8 flex-1 rounded-full hover:bg-error cursor-pointer`}
              >
                <Trash />
              </div>
            )}
            {drawerType == "PeopleList" && id && (
              <DrawerDialogDemo
                drawerType="PeopleList"
                formType={`Edit ${title}`}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e && e.stopPropagation();
                      e && dispatch(selectPeopleList(id));
                    }}
                    variant="outline"
                    className={
                      "h-10 bg-transparent border-none flex-1 rounded-3xl hover:bg-slate-800 w-full cursor-pointer"
                    }
                  >
                    <Edit />
                  </Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            )}
            {drawerType != "SpendsList" &&
              ((drawerType == "InstallmentsList" ||
                drawerType == "ReminderList") &&
              UpdateItem &&
              CompleteItemt ? (
                <>
                  <div
                    onClick={(e) => {
                      e && e.preventDefault();
                      e && e.stopPropagation();
                      e && UpdateItem();
                    }}
                  >
                    {isComplete ? <CheckCircle /> : <DoneAll />}
                  </div>
                  <div
                    onClick={(e) => {
                      e && e.preventDefault();
                      e && e.stopPropagation();
                      e && CompleteItemt();
                    }}
                  >
                    {insstallmentIsComplete ||
                    (date &&
                      DayUnixFormat(+date, "DD") > DayUnixFormatNow("DD")) ? (
                      <CheckCircle />
                    ) : (
                      <Done />
                    )}
                  </div>
                </>
              ) : (
                CompleteItemt && (
                  <BasicSwitch
                    checked={isComplete || false}
                    handleToggle={(e) => {
                      e && e.preventDefault();
                      e && e.stopPropagation();
                      e && !isComplete && CompleteItemt();
                    }}
                    label=""
                    key={"isComplete"}
                  />
                  // <SwitchComponent
                  //   ChangeStatus={CompleteItemt}
                  //   checkStatus={isComplete}
                  //   className="h-8 w-8 min-w-8"
                  // >
                  //   <Done />
                  // </SwitchComponent>
                )
              ))}
          </div>
          {drawerType == "GoalsList" && (
            <label
              className={cn(
                `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
                score && (score > 5 ? "bg-success" : "bg-error")
              )}
            >
              {!isComplete && date && DayUnixFormat(+date, "MM-DD")}
              {!isComplete && ` | `}
              {score && score}
            </label>
          )}
          {drawerType == "HabbitList" && (
            <label
              className={cn(
                `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
                score &&
                  (score == 0
                    ? "bg-white/80"
                    : score > 6
                      ? "bg-success"
                      : "bg-error")
              )}
            >
              {score && score}
            </label>
          )}
          {drawerType == "VisitsList" && (
            <label
              className={cn(
                `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
                date
                  ? "bg-white/15"
                  : date && DayUnixDiff(+date, "day") > 10
                    ? "bg-success"
                    : "bg-error",
                incomeAmount && "bg-success",
                priceOfProduct && "bg-error"
              )}
            >
              {date && DayUnixFormat(+date, "MM-DD HH:mm")}
            </label>
          )}
          {drawerType == "PeopleList" && hasShare && (
            <label
              className={cn(
                "cursor-pointer px-2 py-1 rounded-2xl",
                !total ? "bg-white/15" : total > 0 ? "bg-success" : "bg-error"
              )}
            >
              {total}
            </label>
          )}
          {(incomeAmount || priceOfProduct) && (
            <label
              className={cn(
                `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
                incomeAmount && "bg-success",
                priceOfProduct && "bg-error"
              )}
            >
              {date && DayUnixFormat(+date, "MM-DD")}
              {(incomeAmount || priceOfProduct) && ` | `}
              {`${incomeAmount || priceOfProduct}`}
            </label>
          )}
          {drawerType == "TimerList" && !isComplete && date && (
            <ListItemTimeDiff date={date} />
          )}
          {drawerType == "TimerList" && isComplete && diff && (
            <label
              className={cn(`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`)}
            >
              {/* {date && dayjs(dayjs.unix(Number(date))).format("YYYY-MM-DD ")} */}
              {diff.years() > 0 && `${diff.years()} : `}
              {diff.months() > 0 && `${diff.months()} : `}
              {diff.days() > 0 && `${diff.days()} : `}
              {diff.hours() > 0 && `${diff.hours()} : `}
              {diff.minutes() > 0 && `${diff.minutes()} : `}
              {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
            </label>
          )}
          {drawerType !== "HabbitList" &&
            drawerType !== "VisitsList" &&
            drawerType !== "GoalsList" &&
            drawerType != "SpendsList" &&
            drawerType != "TimerList" &&
            date && (
              <label
                className={cn(
                  `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
                  date && DayUnixDiff(+date, "day") > -1
                    ? "bg-success"
                    : "bg-error"
                )}
              >
                {date && DayUnixFormat(+date, "MM-DD")}
              </label>
            )}
        </div>
      )}
    </div>
  );
};

export default ListItem;
