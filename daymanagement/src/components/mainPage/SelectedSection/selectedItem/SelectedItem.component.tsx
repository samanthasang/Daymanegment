"use client";
import { ShoppingCart } from "@/components/icons";
import ShareItemSpends from "@/components/Share/ShareItem/ShareItemSpends.component";
import ShareItemVisit from "@/components/Share/ShareItem/ShareItemVisit.componen";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { DollarSign, LineChart, Star } from "lucide-react";
import ListCategorySelected from "../../ListSection/listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../../ListSection/listTagSelected/ListTagSelected.component";
import SelectedInsstalmentsItem from "./SelectedInsstalmentsItem.component";
import SelectedItemActivities from "./SelectedItemActivities";
import SelectedItemContainer from "./SelectedItemContainer.component";
import SelectedItemDate from "./SelectedItemDate.component";
import SelectedItemMainInfocomponen from "./SelectedItemMainInfocomponen";
import SelectedItemPeopleList from "./SelectedItemPeopleList.component";
import SelectedItemTimerList from "./SelectedItemTimerList.component";
import SelectedPeopleItem from "./SelectedPeopleItem.component";
import SelectedShareItem from "./SelectedShareItem.component";

export const SelectedItem = ({
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  isFinish,
  isPause,
  doDate,
  peopleId,
  spendsId,
  visitId,
  createDate,
  score,
  highest,
  time,
  total,
  incomeAmount,
  outcomeAmount,
  numberOfProduct,
  priceOfProduct,
  paymentNumber,
  installmentstList,
  shareList,
  phoneNumber,
  birthDate,
  lastUpdate,
  timeDiff,
  priodDiff,
  completeUpdate,
  drawerType,
  drawerTitle,
  description,
  advancePayment,
  paymentCompleteValue,
  numberOfPayment,
  startDate,
  endDate,
  FinishItem,
  CompleteItem,
  DelItem,
  PauseItem,
  UndoneItem,
  DuplicateItem,
  BringTodayItem,
}: {
  id: string;
  priority?: string;
  title: string;
  peopleId: string;
  spendsId?: string;
  visitId?: string;
  category?: string;
  incomeAmount?: string;
  outcomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  advancePayment?: string;
  paymentNumber?: string;
  paymentCompleteValue?: string;
  numberOfPayment?: string;
  tag?: string;
  isComplete: boolean;
  isFinish?: boolean;
  isPause?: boolean;
  doDate: number;
  createDate: number;
  time?: string;
  total?: number;
  shareList?: string[];
  phoneNumber: string;
  birthDate: number;
  installmentstList?: TInstallmentst[];
  startDate?: number;
  endDate?: number;
  lastUpdate?: number;
  completeUpdate?: number;
  description?: string;
  score?: number;
  highest?: number;
  timeDiff?: string;
  priodDiff?: string;
  drawerType?: string;
  drawerTitle: string;
  FinishItem?: () => void;
  CompleteItem?: () => void;
  DelItem?: () => void;
  PauseItem?: () => void;
  UndoneItem?: () => void;
  DuplicateItem?: () => void;
  BringTodayItem?: () => void;
}) => {
  return (
    id && (
      <div className="w-full flex-1 h-full flex flex-col justify-start items-start gap-y-2 rounded-3xl scroll-m-0 overflow-y-scroll">
        <SelectedItemMainInfocomponen
          title={title}
          priority={priority}
          incomeAmount={incomeAmount}
          priceOfProduct={priceOfProduct ?? outcomeAmount}
        />
        <div className="w-full flex flex-row justify-between gap-x-3">
          <SelectedItemContainer title="Category">
            {category && <ListCategorySelected category={category} />}
          </SelectedItemContainer>
          <SelectedItemContainer title="Tag">
            {tag && <ListTagSelected tag={tag} />}
          </SelectedItemContainer>
        </div>
        <SelectedItemDate
          completeUpdate={completeUpdate}
          createDate={createDate || startDate || doDate || 0}
          doDate={doDate || 0}
          lastUpdate={lastUpdate}
          priodDiff={priodDiff}
          startDate={startDate}
          endDate={endDate}
          birthDate={birthDate}
          time={time}
          timeDiff={timeDiff}
        />
        {peopleId && (
          <SelectedItemContainer title="Friend">
            <SelectedPeopleItem id={peopleId} />
          </SelectedItemContainer>
        )}
        {phoneNumber && (
          <SelectedItemContainer
            title="Phone Number"
            description={phoneNumber}
          />
        )}
        {visitId && <ShareItemVisit id={id} visitId={visitId} />}
        {spendsId && <ShareItemSpends id={id} spendsId={spendsId} />}
        {(total || total == 0) && (
          <SelectedItemContainer
            title="Total Amount"
            className={cn(total > 0 ? "text-success" : "text-errorRed")}
            description={total.toString()}
          />
        )}
        {drawerType == "Friends" && <SelectedItemPeopleList id={id} />}
        {(score || highest) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {score && (
              <SelectedItemContainer title="Score">
                <label
                  className={
                    (score && drawerType == "Goals" && score > 4) ||
                    (score && drawerType == "Habbits" && score > 6)
                      ? "text-success"
                      : "text-errorRed"
                  }
                >
                  <div className="flex flex-row items-center gap-x-0.5">
                    <Star width={16} height={16} />
                    {score}
                  </div>
                </label>
              </SelectedItemContainer>
            )}
            {highest && (
              <SelectedItemContainer title="Highest">
                <label
                  className={
                    (highest && drawerType == "Goals" && highest > 4) ||
                    (highest && drawerType == "Habbits" && highest > 9)
                      ? "text-success"
                      : "text-errorRed"
                  }
                >
                  <div className="flex flex-row items-center gap-x-0.5">
                    <LineChart width={16} height={16} />
                    {highest}
                  </div>
                </label>
              </SelectedItemContainer>
            )}
          </div>
        )}
        {drawerType == "Timers" && (
          <SelectedItemTimerList
            isComplete={isComplete}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        {(paymentCompleteValue || advancePayment) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {paymentCompleteValue && (
              <SelectedItemContainer title="Complete Payment">
                <div
                  className={cn(
                    "flex flex-row items-center gap-x-0.5",
                    (score && drawerType == "Goals" && score > 4) ||
                      (score && drawerType == "Habbits" && score > 6)
                      ? "text-success"
                      : "text-errorRed"
                  )}
                >
                  <DollarSign width={16} height={16} />
                  {paymentCompleteValue}
                </div>
              </SelectedItemContainer>
            )}
            {paymentCompleteValue && advancePayment && (
              <SelectedItemContainer title="Advance Payment">
                <div
                  className={cn(
                    "flex flex-row items-center gap-x-0.5",
                    +paymentCompleteValue - +advancePayment > 0
                      ? "text-red-500"
                      : "text-success"
                  )}
                >
                  <DollarSign width={16} height={16} />
                  {advancePayment}
                </div>
              </SelectedItemContainer>
            )}
          </div>
        )}
        {(numberOfPayment || paymentNumber) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {numberOfPayment && (
              <SelectedItemContainer
                title="Installments"
                description={numberOfPayment}
              />
            )}
            {paymentNumber && (
              <SelectedItemContainer
                title="Period"
                description={paymentNumber}
              />
            )}
          </div>
        )}
        {(priceOfProduct || numberOfProduct) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {priceOfProduct && (
              <SelectedItemContainer title="Price Of Product">
                <div className="flex flex-row items-center gap-x-0.5 text-error">
                  <DollarSign width={16} height={16} />
                  {priceOfProduct}
                </div>
              </SelectedItemContainer>
            )}
            {numberOfProduct && (
              <SelectedItemContainer title="Number Of Product">
                <div className="flex flex-row items-center gap-x-1">
                  <ShoppingCart width={16} height={16} />
                  {numberOfProduct}
                </div>
              </SelectedItemContainer>
            )}
          </div>
        )}
        {incomeAmount && (
          <SelectedItemContainer title="Income Amount">
              <div className="flex flex-row items-center gap-x-0.5 text-success">
                <DollarSign width={16} height={16} />
                {incomeAmount}
              </div>
          </SelectedItemContainer>
        )}
        {outcomeAmount && (
          <SelectedItemContainer title="Outcome Amount">
            <label>
              <div className="flex flex-row items-center gap-x-0.5 text-error">
                <DollarSign width={16} height={16} />
                {outcomeAmount}
              </div>
            </label>
          </SelectedItemContainer>
        )}
        <SelectedItemContainer title="Activities">
          <SelectedItemActivities
            drawerType={drawerType || ""}
            drawerTitle={drawerTitle}
            isComplete={isComplete}
            isFinish={isFinish}
            isPause={isPause}
            isToday={DayUnixDiff(doDate, "day") == 0}
            CompleteItem={CompleteItem}
            FinishItem={FinishItem}
            BringTodayItem={BringTodayItem}
            DelItem={DelItem}
            DuplicateItem={DuplicateItem}
            PauseItem={PauseItem}
            UndoneItem={UndoneItem}
          />
        </SelectedItemContainer>
        {installmentstList && (
          <SelectedItemContainer title="Installments">
            {installmentstList.map((inss) => (
              <SelectedInsstalmentsItem
                key={inss.doDate}
                id={id}
                title={title}
                last={inss.doDate == completeUpdate}
                lastupdate={lastUpdate || 0}
                createDate={createDate || doDate || 0}
                {...inss}
              />
            ))}
          </SelectedItemContainer>
        )}
        {drawerType != "Friends" && shareList && shareList.length > 0 && (
          <SelectedItemContainer title="Shares">
            {shareList.map((share) => (
              <SelectedShareItem key={share} id={share} />
            ))}
          </SelectedItemContainer>
        )}
        <SelectedItemContainer title="Description" description={description} />
      </div>
    )
  );
};

export default SelectedItem;
