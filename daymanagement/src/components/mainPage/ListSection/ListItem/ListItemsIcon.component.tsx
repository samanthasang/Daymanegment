import {
  BadgeDollarSign,
  BookUser,
  CalendarRange,
  CalendarSync,
  CircuitBoard,
  FileSpreadsheet,
  ListTodo,
  Target,
  TimerIcon,
  User
} from "lucide-react";

function ListItemsIcon(tilte: string, size: number) {
  switch (tilte) {
    case "Reminders":
      return <CalendarSync width={size} height={size} />;
    case "Todos":
      return <ListTodo width={size} height={size} />;
    case "Habbits":
      return <CalendarRange width={size} height={size} />;
    case "Timers":
      return <TimerIcon width={size} height={size} />;
    case "Spends":
      return <BadgeDollarSign width={size} height={size} />;
    case "Installments":
      return <FileSpreadsheet width={size} height={size} />;
    case "Visits":
      return <BookUser width={size} height={size} />;
    case "Goals":
      return <Target width={size} height={size} />;
    case "Friends":
      return <User width={size} height={size} />;
    case "Shares":
      return <CircuitBoard width={size} height={size} />;
  }
}

export default ListItemsIcon;
