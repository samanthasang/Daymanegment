import PeopleShareList from "@/components/Share/[peopleId]/ShareList/ShareList.component";
import { AccountBalance, ShoppingCart } from "@/components/icons";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import duration from "dayjs/plugin/duration";
import ListPriority from "../ListPriority/ListPriority.component";
import ListCategorySelected from "../listCategorySelected/ListCategorySelected.component";
import ListItemTimeDiff from "../listItem/ListItemTimeDiff.component";
import ListTagSelected from "../listTagSelected/ListTagSelected.component";
import SelectedInsstalmentsItem from "./SelectedInsstalmentsItem.component";
import SelectedItemContainer from "./SelectedItemContainer.component";
import SelectedItemReminder from "./SelectedItemReminder.component";
import SelectedShareItem from "./SelectedShareItem.component";

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
  total,
  totalIncome,
  totalOuCome,
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
  total?: number;
  totalIncome?: number;
  totalOuCome?: number;
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
  return (
    <div className="w-full flex-1 flex flex-col justify-start items-start gap-y-3 scroll-m-0 overflow-y-scroll">
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
          description={DayUnixFormat(+startDate, "YYYY-MM-DD")}
        />
      )}
      {lastUpdate && (
        <SelectedItemContainer
          title="Last Update"
          description={DayUnixFormat(+lastUpdate, "YYYY-MM-DD")}
        />
      )}
      {drawerType == "PeopleList" && (totalIncome || totalIncome == 0) && (
        <SelectedItemContainer
          title="Income Amount"
          className={`${totalIncome && "text-success"}`}
          description={(!!totalIncome && totalIncome.toString()) || "0"}
        />
      )}
      {drawerType == "PeopleList" && (totalOuCome || totalOuCome == 0) && (
        <SelectedItemContainer
          title="Outcome Amount"
          className={`${totalOuCome && "text-red-600"}`}
          description={(!!totalOuCome && totalOuCome.toString()) || "0"}
        />
      )}
      {drawerType == "PeopleList" && (total || total == 0) && (
        <SelectedItemContainer
          title="Total Amount"
          className={`${total > 0 ? "text-success" : "text-red-600"}`}
          description={total.toString()}
        />
      )}
      {drawerType == "SpendsList" && (total || total == 0) && (
        <SelectedItemContainer
          title="Payment Amount"
          className={`${total > 0 ? "text-success" : "text-red-600"}`}
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
          description={DayUnixFormat(+date, "YYYY-MM-DD")}
        />
      )}
      {time && date && (
        <SelectedItemContainer
          title="Do Time"
          description={DayUnixFormat(+date, "hh:mm")}
        />
      )}
      {drawerType == "GoalsList" && (
        <SelectedItemContainer title="Score">
          <label
            className={`${
              score && score > 4 ? "text-success" : "text-red-600"
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
              score && score > 6 ? "text-success" : "text-red-600"
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
              score && score > 15 ? "text-success" : "text-red-600"
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
              !!date && DayUnixFormat(+date, "DD") > DayUnixFormatNow("DD")
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
              : "text-success"
          }
          description={advancePayment}
        />
      )}
      {incomeAmount && (
        <SelectedItemContainer
          title="Income Amount"
          className="text-success"
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
