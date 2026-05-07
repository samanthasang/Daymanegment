import {
  ChevronSmallDoubleUp,
  ChevronSmallTripleUp,
  ChevronSmallUp,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export const ListPriority = ({
  priority,
  showTitle = false,
}: {
  priority: string;
  showTitle?: boolean;
}) => {
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
        {showTitle && priority}
      </label>
    </div>
  );
};

export default ListPriority;
