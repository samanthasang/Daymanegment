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
import ShareItemVisit from "@/components/Share/ShareItem/ShareItemVisit.componen";
import ShareItemSpends from "@/components/Share/ShareItem/ShareItemSpends.component";
import SelectedPeopleItem from "./SelectedPeopleItem.component";

export const SelectedItem = ({
  CompleteItem,
  FinishItem,
  id,
  priority,
  title,
  category,
  tag,
  isComplete,
  isFinish,
  doDate,
  peopleId,
  spendsId,
  visitId,
  createDate,
  score,
  highest,
  time,
  total,
  totalIncome,
  totalOuCome,
  incomeAmount,
  outcomeAmount,
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
  isComplete?: boolean;
  isFinish?: boolean;
  doDate: number;
  createDate: number;
  time?: string;
  total?: number;
  totalIncome?: number;
  totalOuCome?: number;
  shareList?: string[];
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
  CompleteItem?: () => void;
  FinishItem?: () => void;
}) => {
  return (
    id && (
      <div className="w-full flex-1 h-full flex flex-col justify-start items-start gap-y-3 scroll-m-0 overflow-y-scroll">
        <SelectedItemMainInfocomponen
          title={title}
          priority={priority}
          incomeAmount={incomeAmount}
          priceOfProduct={priceOfProduct ?? outcomeAmount}
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
        {peopleId && (
          <SelectedItemContainer title="People">
            <SelectedPeopleItem id={peopleId} />
          </SelectedItemContainer>
        )}
        {visitId && <ShareItemVisit id={id} visitId={visitId} />}
        {spendsId && <ShareItemSpends id={id} spendsId={spendsId} />}
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
        {(score || highest) && (
          <div className="w-full flex flex-row justify-between gap-x-3">
            {score && (
              <SelectedItemContainer title="Score">
                <label
                  className={
                    (score && drawerType == "GoalsList" && score > 4) ||
                    (score && drawerType == "HabbitList" && score > 6)
                      ? "text-success"
                      : "text-red-600"
                  }
                >
                  {score}
                </label>
              </SelectedItemContainer>
            )}
            {highest && (
              <SelectedItemContainer title="Highest">
                <label
                  className={
                    (score && drawerType == "GoalsList" && score > 4) ||
                    (score && drawerType == "HabbitList" && score > 6)
                      ? "text-success"
                      : "text-red-600"
                  }
                >
                  {highest}
                </label>
              </SelectedItemContainer>
            )}
          </div>
        )}
        {CompleteItem && (
          <SelectedItemContainer title="Proggress">
            <SelectedItemProggress
              isComplete={isComplete || false}
              isFinish={isFinish || false}
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
        {outcomeAmount && (
          <SelectedItemContainer
            title="Outcome Amount"
            className="text-error"
            description={outcomeAmount}
          />
        )}
        {shareList && shareList.length > 0 && (
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
