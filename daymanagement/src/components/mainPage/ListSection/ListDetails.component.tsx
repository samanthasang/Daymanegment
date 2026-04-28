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
import ReminderItem from "@/components/Reminder/ReminderItem/ReminderItem.component";
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
    case "TodoList":
      return List?.map((li: TToDo) => <TodoItem key={li.id} item={li} />);
    case "SpendsList":
      return List?.map((li: TSpends) => <SpendsItem key={li.id} item={li} />);
    case "HabbitList":
      return List?.map((li: Thabbit) => <HabbitItem key={li.id} item={li} />);
    case "GoalsList":
      return List?.map((li: TGoals) => <GoalsItem key={li.id} item={li} />);
    case "VisitsList":
      return List?.map((li: TVisit) => <VisitsItem key={li.id} item={li} />);
    case "ReminderList":
      return List?.map((li: TReminder) => (
        <ReminderItem key={li.id} item={li} />
      ));
    case "InstallmentsList":
      return List?.map((li: TInstallmentsts) => (
        <InstallmentsItem key={li.id} item={li} />
      ));
    case "TimerList":
      return List?.map((li: TTimer) => <Timeritem key={li.id} item={li} />);
    case "PeopleList":
    case "PeopleList":
      return List?.map((li: TPeople) => <PeopleItem key={li.id} item={li} />);
    case "ShareList":
      return List?.map((li: TShare) => <ShareItem key={li.id} item={li} />);
    default:
      return <>nothing to show</>;
  }
}

export default ListDetails;
