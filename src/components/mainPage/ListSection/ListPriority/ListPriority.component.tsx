import {
  ChevronSmallDoubleUp,
  ChevronSmallTripleUp,
  ChevronSmallUp,
} from "@/components/icons";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";

export const ListPriority = ({
  priority,
  showTitle = false,
}: {
  priority: string;
  showTitle?: boolean;
}) => {
  const t: any = UseLangComponent("Priority");

  const priorityIcon = () => {
    switch (priority) {
      case "High":
        return <ChevronSmallTripleUp />;
      case "Medium":
        return <ChevronSmallDoubleUp />;
      case "Low":
        return <ChevronSmallUp />;

      default:
        return <ChevronSmallTripleUp />;
    }
  };

  const priorityTitle = () => {
    switch (priority) {
      case "High":
        return t.High;
      case "Medium":
        return t.Medium;
      case "Low":
        return t.Low;

      default:
        return t.High;
    }
  };
  return (
    <div className="flex items-center">
      {priorityIcon()}
      <label
        className={cn(
          priority == "High"
            ? "text-errorRed"
            : priority == "Medium"
              ? "text-successGreen"
              : priority == "Low"
                ? "text-yellow-300"
                : "text-white"
        )}
      >
        {showTitle && priorityTitle()}
      </label>
    </div>
  );
};

export default ListPriority;
