import FriendsItem from "@/components/Friends/FriendsItem/FriendsItem.component";
import GoalsItem from "@/components/Goals/GoalsItem/GoalsItem.component";
import HabbitItem from "@/components/Habbit/HabbitItem/HabbitItem.componen";
import InstallmentsItem from "@/components/Installments/InstallmentsItem/Installments.component";
import ReminderItem from "@/components/Reminder/RemindersItem/ReminderItem.component";
import ShareItem from "@/components/Share/ShareItem/ShareItem.component";
import SpendsItem from "@/components/Spends/SpendsItem/SpendsItem.component";
import Timeritem from "@/components/Timer/TimerItem/TimerItem.component";
import VisitsItem from "@/components/Visits/VisitsItem/VisitsItem.component";
import { TGoals } from "@/modules/goalsList/goals.slice";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import { TShare } from "@/modules/share/share.slice";
import { TSpends } from "@/modules/spends/spends.slice";
import { TTimer } from "@/modules/timerList/timer.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import { TVisit } from "@/modules/visitsList/visit.slice";
import TodoItem from "../../Todo/TodoItem/TodoItem.component";

function ListDetailsItem({
  drawerType,
  List,
}: {
  drawerType: string;
  List: [];
  }) {
  
  
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
      return List?.map((li: TPeople, index) => (
        <FriendsItem key={li && li.id ? li.id : index} item={li} />
      ));
    case "Shares":
      return List?.map((li: TShare) => <ShareItem key={li.id} item={li} />);
    default:
      return <>nothing to show</>;
  }
}

export default ListDetailsItem;
