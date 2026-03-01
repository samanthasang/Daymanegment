import {
  ChevronSmallDoubleUp,
  ChevronSmallTripleUp,
  ChevronSmallUp,
} from "@/components/icons";

export const ListPriority = ({ priority }: { priority: string }) => {
  const priorityIcon = () => {
    switch (priority) {
      case "High":
        return <ChevronSmallTripleUp className="fill-red-500" />;
      case "Medium":
        return <ChevronSmallDoubleUp className="fill-red-500" />;
      case "Low":
        return <ChevronSmallUp className="fill-red-500" />;

      default:
        return <ChevronSmallTripleUp className="fill-red-500" />;
    }
  };

  return priorityIcon();
};

export default ListPriority;
