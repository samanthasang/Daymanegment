import PeopleShareList from "@/components/Share/[peopleId]/ShareList/ShareList.component";
import { AccountBalance, ShoppingCart } from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ListPriority from "../ListPriority/ListPriority.component";
import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListItemTimeDiff from "../listItem/ListItemTimeDiff.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";
import SelectedInsstalmentsItem from "./SelectedInsstalmentsItem.component";
import SelectedItemContainer from "./SelectedItemContainer.component";
import SelectedItemReminder from "./SelectedItemReminder.component";
import SelectedShareItem from "./SelectedShareItem.component";
dayjs.extend(duration);

const currentUnixTimestamp = dayjs().unix();
export const SelectedItem = ({
  CompleteItemt,
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  date,
  diff,
  score,
  time,
  income,
  incomeAmount,
  numberOfProduct,
  priceOfProduct,
  paymentNumber,
  installmentstList,
  shareList,
  lastUpdate,
  timeDiff,
  priodDiff,
  completeUpdate,
  drawerType,
  description,
  advancePayment,
  paymentCompleteValue,
  numberOfPayment,
  startDate,
  formType,
  withDel = true,
}: {
  CompleteItemt?: () => void;
  id: string;
  priority?: string;
  title: string;
  category?: string;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  advancePayment?: string;
  paymentNumber?: string;
  paymentCompleteValue?: string;
  numberOfPayment?: string;
  tag?: string;
  isComplete?: boolean;
  withDel?: boolean;
  income?: boolean;
  date?: string;
  time?: string;
  diff?: duration.Duration;
  shareList?: TShare[];
  installmentstList?: TInstallmentst[];
  startDate?: string;
  lastUpdate?: string;
  completeUpdate?: string;
  description?: string;
  score?: number;
  timeDiff?: string;
  priodDiff?: string;
  drawerType?: string;
  formType?: string;
}) => {
  const dispatch = useAppDispatch();
  const {
    ListShare,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || {};

  const total = ListShare?.filter((share) => share.peopleId == id).reduce(
    (acc, obj) => {
      if (obj.income && obj.incomeAmount) {
        return acc + +obj.incomeAmount;
      }
      if (!obj.income && obj.outcomeAmount) {
        return acc - +obj.outcomeAmount;
      }
      return acc;
    },
    0
  );
  return (
    <div className="w-full h-fit flex flex-col justify-start items-start p-3 gap-y-3 scroll-m-0 overflow-y-scroll">
      <SelectedItemContainer title="Title" description={title} />
      {priority && (
        <SelectedItemContainer title="Priority">
          <div className="text-lg flex gap-x-1 items-center">
            <ListPriority priority={priority} />
            {priority}
          </div>
        </SelectedItemContainer>
      )}
      {startDate && (
        <SelectedItemContainer
          title="Start Date"
          description={dayjs(dayjs.unix(Number(startDate))).format(
            "YYYY-MM-DD"
          )}
        />
      )}
      {lastUpdate && (
        <SelectedItemContainer
          title="Last Update"
          description={dayjs(dayjs.unix(Number(lastUpdate))).format(
            "YYYY-MM-DD"
          )}
        />
      )}
      {drawerType == "SpendsList" && (total || total == 0) && (
        <SelectedItemContainer
          title="Payment Amount"
          className={`${total > 0 ? "text-green-500" : "text-red-600"}`}
          description={total.toString()}
        />
      )}
      {/* {completeUpdate && (
        <SelectedItemContainer
          title="Complete Update"
          description={dayjs(dayjs.unix(Number(completeUpdate))).format(
            "YYYY-MM-DD"
          )}
        />
      )} */}
      {date && (
        <SelectedItemContainer
          title="Do Date"
          description={dayjs(dayjs.unix(Number(date))).format("YYYY-MM-DD")}
        />
      )}
      {time && (
        <SelectedItemContainer
          title="Do Time"
          description={dayjs(dayjs.unix(Number(date))).format("hh:mm")}
        />
      )}
      {drawerType == "GoalsList" && (
        <SelectedItemContainer title="Score">
          <label
            className={`${
              score && score > 4 ? "text-green-500" : "text-red-600"
            }`}
          >
            {score}
          </label>
        </SelectedItemContainer>
      )}
      {drawerType == "PeopleList" && (
        <SelectedItemContainer title="Share List">
          <PeopleShareList peopleId={id} />
        </SelectedItemContainer>
      )}
      {drawerType == "HabbitList" && (
        <SelectedItemContainer title="Score">
          <label
            className={`${
              score && score > 6 ? "text-green-500" : "text-red-600"
            }`}
          >
            {score}
          </label>
        </SelectedItemContainer>
      )}
      {drawerType == "MyHabbitList" && (
        <SelectedItemContainer title="Score">
          <label
            className={`${
              score && score > 15 ? "text-green-500" : "text-red-600"
            }`}
          >
            {score}
          </label>
        </SelectedItemContainer>
      )}
      {timeDiff && (
        <SelectedItemContainer
          title="Reminde After"
          description={`${timeDiff} / ${priodDiff}`}
        />
      )}
      {drawerType == "ReminderList" && (
        <SelectedItemContainer title="Proggress">
          <SelectedItemReminder
            id={id}
            title={title}
            isfinished={isComplete || false}
            isComplete={
              dayjs(dayjs.unix(Number(date))).format("DD") >
              dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")
            }
          />
        </SelectedItemContainer>
      )}
      {drawerType !== "ReminderList" && CompleteItemt && (
        <SelectedItemContainer>
          <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
            <label className="text-xl text-blue-500">Proggress</label>
            <div>
              <BasicSwitch
                checked={isComplete || false}
                handleToggle={(e) => {
                  e && e.preventDefault();
                  CompleteItemt();
                }}
                label=""
                key={"isComplete"}
              />
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {drawerType == "TimerList" && !isComplete && (
        <SelectedItemContainer title="Timer">
          <ListItemTimeDiff date={startDate} />
        </SelectedItemContainer>
      )}
      {drawerType == "TimerList" && isComplete && diff && (
        <SelectedItemContainer title="Timer">
          <label className="bg-white/15 rounded-2xl py-1 px-2">
            {diff.years() > 0 && `${diff.years()} : `}
            {diff.months() > 0 && `${diff.months()} : `}
            {diff.days() > 0 && `${diff.days()} : `}
            {diff.hours() > 0 && `${diff.hours()} : `}
            {diff.minutes() > 0 && `${diff.minutes()} : `}
            {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
          </label>
        </SelectedItemContainer>
      )}
      {category && category != "" && (
        <SelectedItemContainer title="Category">
          <ListCategorySelected category={category} />
        </SelectedItemContainer>
      )}
      {tag && tag != "" && (
        <SelectedItemContainer title="Tag">
          <ListTagSelected tag={tag} />
        </SelectedItemContainer>
      )}

      {(incomeAmount || priceOfProduct) && (
        <SelectedItemContainer title="Type">
          {incomeAmount && <AccountBalance />}
          {priceOfProduct && <ShoppingCart />}
        </SelectedItemContainer>
      )}
      {priceOfProduct && (
        <SelectedItemContainer
          title="Price Of Product"
          className="text-red-500"
          description={priceOfProduct}
        />
      )}
      {numberOfProduct && (
        <SelectedItemContainer
          title="Number Of Product"
          description={numberOfProduct}
        />
      )}
      {numberOfPayment && paymentNumber && (
        <SelectedItemContainer
          title="Number Of Payment"
          description={`${numberOfPayment} / ${paymentNumber}`}
        />
      )}
      {paymentCompleteValue && advancePayment && (
        <SelectedItemContainer
          title="Payment"
          className={
            +paymentCompleteValue - +advancePayment > 0
              ? "text-red-500"
              : "text-green-500"
          }
          description={advancePayment}
        />
      )}
      {incomeAmount && (
        <SelectedItemContainer
          title="Income Amount"
          className="text-green-500"
          description={incomeAmount}
        />
      )}
      {drawerType == "SpendsList" && shareList && shareList?.length > 0 && (
        <SelectedItemContainer title="Shares">
          {shareList.map((share) => (
            <SelectedShareItem
              key={share.id}
              peopleId={share.peopleId}
              incomeAmount={share.incomeAmount}
              outcomeAmount={share.outcomeAmount}
            />
          ))}
        </SelectedItemContainer>
      )}
      {drawerType !== "SpendsList" && shareList && shareList?.length > 0 && (
        <SelectedItemContainer title="Shares">
          {shareList.map((share) => (
            <SelectedShareItem
              key={share.id}
              peopleId={share.peopleId}
              incomeAmount={share.incomeAmount}
              outcomeAmount={share.outcomeAmount}
            />
          ))}
        </SelectedItemContainer>
      )}
      {installmentstList && (
        <SelectedItemContainer title="Installments">
          {installmentstList.map((inss, index) => (
            <SelectedInsstalmentsItem
              key={inss.date}
              id={id}
              title={title}
              last={index == installmentstList.length}
              {...inss}
            />
          ))}
        </SelectedItemContainer>
      )}
      {paymentCompleteValue && (
        <SelectedItemContainer
          title="Payment Complete Value"
          description={paymentCompleteValue}
        />
      )}
      {description && (
        <SelectedItemContainer title="Description" description={description} />
      )}
    </div>
  );
};

export default SelectedItem;
