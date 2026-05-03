import {
  BookUser,
  CircuitBoard,
  FileSpreadsheet,
  ListCheckIcon,
  Repeat2,
  ShoppingCart,
  Target,
  TimerIcon,
  TimerReset,
  User,
} from "lucide-react";

function ListItemsIcon(tilte: string) {
  switch (tilte) {
    case "ReminderList":
      return <Repeat2 width={72} height={72} />;
    case "TodoList":
      return <ListCheckIcon width={72} height={72} />;
    case "HabbitList":
      return <TimerReset width={72} height={72} />;
    case "TimerList":
      return <TimerIcon width={72} height={72} />;
    case "SpendsList":
      return <ShoppingCart width={72} height={72} />;
    case "InstallmentsList":
      return <FileSpreadsheet width={72} height={72} />;
    case "VisitsList":
      return <BookUser width={72} height={72} />;
    case "GoalsList":
      return <Target width={72} height={72} />;
    case "PeopleList":
      return <User width={72} height={72} />;
    case "ShareList":
      return <CircuitBoard width={72} height={72} />;
  }
}

export default ListItemsIcon;
