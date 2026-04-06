"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import TimerListActivities from "@/lib/Hooks/Lists/Timer/TimerListActivities.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import { DayUnixDuration } from "@/lib/Hooks/UseDayJS";

function SelectedTimerList() {
  const { CompleteItemt, DelItem, SelectItem } = TimerListActivities();

  const { selectedTimer } = useTimerList();

  const diff =
    selectedTimer &&
    DayUnixDuration(selectedTimer.startDate, selectedTimer.endDate);

  return (
    <SelectedContainer>
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(selectedTimer.id, selectedTimer.title)
        }
        drawerType="TimerList"
        diff={diff}
        {...selectedTimer}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedTimer.id, selectedTimer.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="TimerList"
        formType="Edit Timer"
        selectedIsComplete={selectedTimer.isComplete}
      />
    </SelectedContainer>
  );
}

export default SelectedTimerList;
