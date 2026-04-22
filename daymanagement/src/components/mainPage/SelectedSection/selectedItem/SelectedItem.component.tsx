"use client";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { TShare } from "@/modules/share/share.slice";
import ListCategorySelected from "../../ListSection/listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../../ListSection/listTagSelected/ListTagSelected.component";
import SelectedInsstalmentsItem from "./SelectedInsstalmentsItem.component";
import SelectedItemContainer from "./SelectedItemContainer.component";
import SelectedItemDate from "./SelectedItemDate.component";
import SelectedItemMainInfocomponen from "./SelectedItemMainInfocomponen";
import SelectedItemPeopleList from "./SelectedItemPeopleList.component";
import { SelectedItemProggress } from "./SelectedItemReminder.component";
import SelectedItemTimerList from "./SelectedItemTimerList.component";
import SelectedShareItem from "./SelectedShareItem.component";

export const SelectedItem = ({
  CompleteItem,
  FinishItem,
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  isfinished,
  doDate,
  createDate,
  score,
  time,
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
  endDate,
}: {
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
  isfinished?: boolean;
  doDate: number;
  createDate: number;
  time?: string;
  total?: number;
  totalIncome?: number;
  totalOuCome?: number;
  shareList?: TShare[];
  installmentstList?: TInstallmentst[];
  startDate?: number;
  endDate?: number;
  lastUpdate?: number;
  completeUpdate?: number;
  description?: string;
  score?: number;
  timeDiff?: string;
  priodDiff?: string;
  drawerType?: string;
  CompleteItem?: () => void;
  FinishItem?: () => void;
}) => {
  return (
    id &&
    title && (
      <div className="w-full flex-1 h-full flex flex-col justify-start items-start gap-y-3 scroll-m-0 overflow-y-scroll">
        <SelectedItemMainInfocomponen
          title={title}
          priority={priority}
          incomeAmount={incomeAmount}
          priceOfProduct={priceOfProduct}
        />
        {(category || tag) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            <SelectedItemContainer title="Category">
              <ListCategorySelected category={category} />
            </SelectedItemContainer>
            <SelectedItemContainer title="Tag">
              <ListTagSelected tag={tag} />
            </SelectedItemContainer>
          </div>
        )}
        <SelectedItemDate
          completeUpdate={completeUpdate}
          createDate={createDate || startDate || doDate || 0}
          doDate={doDate || 0}
          lastUpdate={lastUpdate}
          priodDiff={priodDiff}
          startDate={startDate}
          endDate={endDate}
          time={time}
          timeDiff={timeDiff}
        />
        {(total || total == 0) && (
          <SelectedItemContainer
            title="Total Amount"
            className={`${total > 0 ? "text-success" : "text-red-600"}`}
            description={total.toString()}
          />
        )}
        {drawerType == "PeopleList" && (
          <SelectedItemPeopleList
            id={id}
            totalIncome={totalIncome}
            totalOuCome={totalOuCome}
          />
        )}
        {score && (
          <SelectedItemContainer title="Score">
            <label
              className={
                (drawerType == "GoalsList" && score > 4) ||
                (drawerType == "HabbitList" && score > 6)
                  ? "text-success"
                  : "text-red-600"
              }
            >
              {score}
            </label>
          </SelectedItemContainer>
        )}
        {CompleteItem && (
          <SelectedItemContainer title="Proggress">
            <SelectedItemProggress
              isComplete={isComplete || false}
              isfinished={isfinished || false}
              CompleteItem={CompleteItem}
              FinishItem={FinishItem}
            />
          </SelectedItemContainer>
        )}
        {drawerType == "TimerList" && (
          <SelectedItemTimerList
            isComplete={isComplete}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        {(paymentCompleteValue || advancePayment) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {paymentCompleteValue && (
              <SelectedItemContainer
                title="Payment Complete Value"
                description={paymentCompleteValue}
              />
            )}
            {paymentCompleteValue && advancePayment && (
              <SelectedItemContainer
                title="Advance Payment"
                className={
                  +paymentCompleteValue - +advancePayment > 0
                    ? "text-red-500"
                    : "text-success"
                }
                description={advancePayment}
              />
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
        {(priceOfProduct || numberOfProduct) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
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
          </div>
        )}
        {incomeAmount && (
          <SelectedItemContainer
            title="Income Amount"
            className="text-success"
            description={incomeAmount}
          />
        )}
        {shareList && shareList.length > 0 && (
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
        <SelectedItemContainer title="Description" description={description} />
      </div>
    )
  );
};

export default SelectedItem;
