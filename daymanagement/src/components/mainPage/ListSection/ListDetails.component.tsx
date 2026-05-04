import { TToDo } from "@/modules/toDoList/todo.slice";
import TodoItem from "../../Todo/TodoItem/TodoItem.component";
import { TSpends } from "@/modules/spends/spends.slice";
import SpendsItem from "@/components/Spends/SpendsItem/SpendsItem.component";
import HabbitItem from "@/components/Habbit/HabbitItem/HabbitItem.componen";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import GoalsItem from "@/components/Goals/GoalsItem/GoalsItem.component";
import { TGoals } from "@/modules/goalsList/goals.slice";
import VisitsItem from "@/components/Visits/VisitsItem/VisitsItem.component";
import { TVisit } from "@/modules/visitsList/visit.slice";
import ReminderItem from "@/components/Reminder/RemindersItem/ReminderItem.component";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import InstallmentsItem from "@/components/Installments/InstallmentsItem/Installments.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import { TTimer } from "@/modules/timerList/timer.slice";
import Timeritem from "@/components/Timer/TimerItem/TimerItem.component";
import PeopleItem from "@/components/People/PeopleItem/PeopleItem.component";
import { TPeople } from "@/modules/people/PeopleList.slice";
import ShareItem from "@/components/Share/ShareItem/ShareItem.component";
import { TShare } from "@/modules/share/share.slice";

function ListDetails({ drawerType, List }: { drawerType: string; List: [] }) {
  switch (drawerType) {
    case "Todos":
      return List?.map((li: TToDo) => <TodoItem key={li.id} item={li} />);
    case "Spends":
      return List?.map((li: TSpends) => <SpendsItem key={li.id} item={li} />);
    case "Habbits":
      return List?.map((li: Thabbit) => <HabbitItem key={li.id} item={li} />);
    case "Goals":
      return List?.map((li: TGoals) => <GoalsItem key={li.id} item={li} />);
    case "Visits":
      return List?.map((li: TVisit) => <VisitsItem key={li.id} item={li} />);
    case "Reminders":
      return List?.map((li: TReminder) => (
        <ReminderItem key={li.id} item={li} />
      ));
    case "Installments":
      return List?.map((li: TInstallmentsts) => (
        <InstallmentsItem key={li.id} item={li} />
      ));
    case "Timers":
      return List?.map((li: TTimer) => <Timeritem key={li.id} item={li} />);
    case "Friends":
      return List?.map((li: TPeople) => <PeopleItem key={li.id} item={li} />);
    case "Shares":
      return List?.map((li: TShare) => <ShareItem key={li.id} item={li} />);
    default:
      return <>nothing to show</>;
  }
}

export default ListDetails;
