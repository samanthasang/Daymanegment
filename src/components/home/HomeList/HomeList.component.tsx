"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import SelectedSection from "@/components/mainPage/SelectedSection/SelectedSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";

function HomeList() {
  const { ListTodoToday } = useTodoList();
  const { ListGoalsToday } = useGoalsList();
  const { ListHabbitToday } = UseHabbitList();
  const { ListTimerFiltered } = useTimerList();
  const { ListReminderToday } = useReminderList();
  const { ListVisitToday, selectedVisit } = useVisitList();
  const { ListInstallmentsToday } = useInstallmentsList();
  const { ListSpendsToday } = useSpendsList();
  const { ListSharesToday } = useShareList();

  const listToday = [
    ...ListTodoToday,
    ...ListGoalsToday,
    ...ListReminderToday,
    ...ListVisitToday,
    ...ListInstallmentsToday,
    ...ListSpendsToday,
    ...ListSharesToday,
    ...ListHabbitToday,
  ];
  const ListTimerFuture = ListTimerFiltered.filter(
    (a) => +a.startDate >= currentUnixTimestamp
  );
  const ListTimerPast = ListTimerFiltered.filter(
    (a) => +a.startDate < currentUnixTimestamp
  );
  const ListFuture = [
    ...listToday.filter((a) => +a.doDate >= currentUnixTimestamp),
    ...ListTimerFuture,
  ];
  const ListPast = [
    ...listToday.filter((a) => +a.doDate < currentUnixTimestamp),
    ...ListTimerPast,
  ];
  return (
    <>
      <ListSection
        drawerType="Today"
        formType="Add"
        drawerTitle="Today"
        selectedID={selectedVisit && !!selectedVisit.id}
        ListFilteredTilte="Today"
        ListForgotTilte="Old Today"
        ListFilteredCount={FinishedArray(ListFuture).length}
        ListForgotCount={FinishedArray(ListPast).length}
        ListFiltered={ListFuture as []}
        ListForgot={ListPast as []}
        withFinish
        withComplateSort
      />
      <SelectedSection
        drawerType="Visits"
        formType="Edit"
        drawerTitle="Visit"
        isComplete={(selectedVisit && selectedVisit.isComplete) || false}
        time={selectedVisit && selectedVisit.doDate}
        // CompleteItem={() => CompleteItem(selectedVisit.id, selectedVisit.title)}
        // UndoneItem={() => CompleteItem(selectedVisit.id, selectedVisit.title)}
        // DelItem={() => DelItem(selectedVisit.id, selectedVisit.title)}
        SelectItem={() => console.log("set Item")}
        // BringTodayItem={() => BringTodayItem({ ...selectedVisit })}
        // DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedVisit })}
        // AddOneDayToItem={() => AddDayToItem({ ...selectedVisit }, 1)}
        // AddSevenDaysToItem={() => AddDayToItem({ ...selectedVisit }, 7)}
        // PaymentCompleteItem={() => PaymentCompleteItem({ ...selectedVisit })}
        selected={selectedVisit}
      />
    </>
  );
}

export default HomeList;
