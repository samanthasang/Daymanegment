import {
  BadgeDollarSign,
  BookUser,
  CircuitBoard,
  FileSpreadsheet,
  ListTodo,
  Repeat2,
  Target,
  TimerIcon,
  TimerReset,
  User,
} from "lucide-react";

function ListItemsIcon(tilte: string, size: number) {
  switch (tilte) {
    case "ReminderList":
      return <Repeat2 width={size} height={size} />;
    case "TodoList":
      return <ListTodo width={size} height={size} />;
    case "HabbitList":
      return <TimerReset width={size} height={size} />;
    case "TimerList":
      return <TimerIcon width={size} height={size} />;
    case "SpendsList":
      return <BadgeDollarSign width={size} height={size} />;
    case "InstallmentsList":
      return <FileSpreadsheet width={size} height={size} />;
    case "VisitsList":
      return <BookUser width={size} height={size} />;
    case "GoalsList":
      return <Target width={size} height={size} />;
    case "PeopleList":
      return <User width={size} height={size} />;
    case "ShareList":
      return <CircuitBoard width={size} height={size} />;
  }
}

export default ListItemsIcon;
