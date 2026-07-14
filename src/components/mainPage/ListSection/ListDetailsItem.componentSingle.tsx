import FriendsItem from "@/components/Friends/FriendsItem/FriendsItem.component";
import GoalsItem from "@/components/Goals/GoalsItem/GoalsItem.component";
import HabbitItem from "@/components/Habbit/HabbitItem/HabbitItem.componen";
import InstallmentsItem from "@/components/Installments/InstallmentsItem/Installments.component";
import ReminderItem from "@/components/Reminder/RemindersItem/ReminderItem.component";
import ShareItem from "@/components/Share/ShareItem/ShareItem.component";
import SpendsItem from "@/components/Spends/SpendsItem/SpendsItem.component";
import Timeritem from "@/components/Timer/TimerItem/TimerItem.component";
import VisitsItem from "@/components/Visits/VisitsItem/VisitsItem.component";
import TodoItem from "../../Todo/TodoItem/TodoItem.component";

function ListDetailsItemSingle({
	drawerType,
	item,
}: {
	drawerType: string;
	item: any;
}) {
	switch (drawerType) {
		case "Todos":
		case "Todo":
			return <TodoItem item={item} />;
		case "Spends":
		case "Spend":
			return <SpendsItem item={item} />;
		case "Habits":
		case "Habit":
			return <HabbitItem item={item} />;
		case "Goals":
		case "Goal":
			return <GoalsItem item={item} />;
		case "Visits":
		case "Visit":
			return <VisitsItem item={item} />;
		case "Reminders":
		case "Reminder":
			return <ReminderItem item={item} />;
		case "Installments":
		case "Installment":
			return <InstallmentsItem item={item} />;

		case "Timers":
		case "Timer":
			return <Timeritem item={item} />;
		case "Friends":
			return <FriendsItem item={item} />;

		case "Shares":
		case "Share":
			return <ShareItem item={item} />;
		case "Today":
			return <ListDetailsItemSingle drawerType={item.dType} item={item} />;
		default:
			return <>nothing to show</>;
	}
}

export default ListDetailsItemSingle;
