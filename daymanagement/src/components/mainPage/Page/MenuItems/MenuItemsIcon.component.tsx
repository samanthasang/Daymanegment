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
  Users,
} from "lucide-react";

function MenuItemsIcon(tilte: string) {
  switch (tilte) {
    case "Reminder":
      return <Repeat2 width={16} height={16} />;
    case "Todos":
      return <ListTodo width={16} height={16} />;
    case "Habbit":
      return <TimerReset width={16} height={16} />;
    case "Timer":
      return <TimerIcon width={16} height={16} />;
    case "Spends":
      return <BadgeDollarSign width={16} height={16} />;
    case "Installment":
      return <FileSpreadsheet width={16} height={16} />;
    case "Visits":
      return <BookUser width={16} height={16} />;
    case "Goals":
      return <Target width={16} height={16} />;
    case "Friends":
      return <Users width={16} height={16} />;
    case "Share":
      return <CircuitBoard width={16} height={16} />;
  }
}

export default MenuItemsIcon;
