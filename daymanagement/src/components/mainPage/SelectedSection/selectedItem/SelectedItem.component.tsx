"use client";
import ShareItemSpends from "@/components/Share/ShareItem/ShareItemSpends.component";
import ShareItemVisit from "@/components/Share/ShareItem/ShareItemVisit.componen";
import { DayToday, DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import ListCategorySelected from "../../ListSection/listCategorySelected/ListCategorySelected.component";
import ListTagSelected from "../../ListSection/listTagSelected/ListTagSelected.component";
import SelectedInsstalmentsItem from "./SelectedInsstalmentsItem.component";
import SelectedItemActivities from "./SelectedItemActivities";
import SelectedItemContainer from "./SelectedItemContainer.component";
import SelectedItemDate from "./SelectedItemDate.component";
import SelectedItemHabbit from "./SelectedItemHabbit.component";
import SelectedItemInstallments from "./SelectedItemInstallments.component";
import SelectedItemMainInfocomponen from "./SelectedItemMainInfocomponen";
import SelectedItemPeopleList from "./SelectedItemPeopleList.component";
import SelectedItemSpends from "./SelectedItemSpends.component";
import SelectedItemTimerList from "./SelectedItemTimerList.component";
import SelectedItemVisit from "./SelectedItemVisit.component";
import SelectedPeopleItem from "./SelectedPeopleItem.component";
import SelectedShareItem from "./SelectedShareItem.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export const SelectedItem = ({
  id,
  priority,
  title,
  firstName,
  lastName,
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
  income,
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
  DuplicateTodayItem,
  AddOneDayToItem,
  AddSevenDaysToItem,
  PaymentCompleteItem,
}: {
  id: string;
  priority?: string;
  title: string;
  firstName: string;
  lastName: string;
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
  income: boolean;
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
  DuplicateTodayItem?: () => void;
  AddOneDayToItem?: () => void;
  AddSevenDaysToItem?: () => void;
  PaymentCompleteItem?: () => void;
}) => {
  const t: any = UseLangComponent("Selected");
  return (
    id && (
      <div className="w-full flex-1 h-full flex flex-col justify-start items-start gap-y-2 rounded-3xl scroll-m-0 overflow-y-scroll">
        <SelectedItemMainInfocomponen
          title={title}
          isFinish={isFinish || (!!endDate && isComplete)}
          priority={priority}
          incomeAmount={
            (drawerType != "Shares" && income && incomeAmount) || undefined
          }
          priceOfProduct={
            (drawerType != "Shares" && (priceOfProduct ?? outcomeAmount)) ||
            undefined
          }
        />
        {drawerType == "Friends" && (
          <div className="w-full flex flex-row justify-between gap-x-2">
            <SelectedItemContainer
              title={t.firstName}
              description={firstName}
            />
            <SelectedItemContainer title={t.lastName} description={lastName} />
          </div>
        )}
        <div className="w-full flex flex-row justify-between gap-x-2">
          <SelectedItemContainer title={t.Category}>
            {category && <ListCategorySelected category={category} />}
          </SelectedItemContainer>
          <SelectedItemContainer title={t.Tag}>
            {tag && <ListTagSelected tag={tag} />}
          </SelectedItemContainer>
        </div>
        <SelectedItemDate
          completeUpdate={completeUpdate}
          createDate={createDate || 0}
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
          <SelectedItemContainer title={t.Friend}>
            <SelectedPeopleItem id={peopleId} />
          </SelectedItemContainer>
        )}
        {phoneNumber && (
          <SelectedItemContainer
            title={t.PhoneNumber}
            description={phoneNumber}
          />
        )}
        {visitId && <ShareItemVisit id={id} visitId={visitId} />}
        {spendsId && <ShareItemSpends id={id} spendsId={spendsId} />}
        {(total || total == 0) && (
          <SelectedItemContainer
            title={t.TotalAmount}
            className={cn(total > 0 ? "text-successGreen" : "text-errorRed")}
            description={total.toString()}
          />
        )}
        {drawerType == "Friends" && <SelectedItemPeopleList id={id} />}
        <SelectedItemHabbit
          score={score}
          highest={highest}
          drawerType={drawerType}
        />
        {drawerType == "Timers" && (
          <SelectedItemTimerList
            isComplete={isComplete}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        <SelectedItemVisit
          advancePayment={advancePayment}
          paymentCompleteValue={paymentCompleteValue}
          installmentstList={installmentstList}
        />
        <SelectedItemInstallments
          paymentNumber={paymentNumber}
          numberOfPayment={numberOfPayment}
        />
        <SelectedItemSpends
          income={income}
          incomeAmount={(income && incomeAmount) || undefined}
          outcomeAmount={(!income && outcomeAmount) || undefined}
          numberOfProduct={numberOfProduct}
          priceOfProduct={priceOfProduct}
        />
        <SelectedItemContainer title={t.Activities}>
          <SelectedItemActivities
            drawerType={drawerType || ""}
            drawerTitle={drawerTitle}
            isComplete={isComplete}
            isFinish={isFinish}
            isPause={isPause}
            isPaymentComplete={
              !!paymentCompleteValue &&
              !!advancePayment &&
              +paymentCompleteValue - +advancePayment != 0
            }
            isToday={DayToday(doDate)}
            CompleteItem={CompleteItem}
            FinishItem={FinishItem}
            BringTodayItem={BringTodayItem}
            DelItem={DelItem}
            DuplicateItem={DuplicateItem}
            PauseItem={PauseItem}
            UndoneItem={UndoneItem}
            DuplicateTodayItem={DuplicateTodayItem}
            AddOneDayToItem={AddOneDayToItem}
            AddSevenDaysToItem={AddSevenDaysToItem}
            PaymentCompleteItem={PaymentCompleteItem}
          />
        </SelectedItemContainer>
        {installmentstList && (
          <SelectedItemContainer title={t.Installments}>
            {installmentstList.map((inss) => (
              <SelectedInsstalmentsItem
                key={inss.doDate}
                id={id}
                title={title}
                isFinish={isFinish}
                lastupdate={lastUpdate || 0}
                date={doDate || 0}
                doDate={inss.doDate}
                isComplete={inss.isComplete}
                payment={inss.payment}
              />
            ))}
          </SelectedItemContainer>
        )}
        {drawerType != "Friends" && shareList && shareList.length > 0 && (
          <SelectedItemContainer title={t.Shares}>
            {shareList.map((share) => (
              <SelectedShareItem
                key={share}
                id={id}
                shareid={share}
                drawerType={drawerType || ""}
              />
            ))}
          </SelectedItemContainer>
        )}
        <SelectedItemContainer
          title={t.Description}
          description={description}
        />
      </div>
    )
  );
};

export default SelectedItem;
