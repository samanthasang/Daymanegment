import { cn } from "@/lib/utils";

export const SelectedItemContainer = ({
  title,
  description,
  className,
  children,
  classContainer,
}: {
  title?: string;
  description?: string;
  className?: string;
  classContainer?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full flex h-fit flex-col gap-y-1 justify-start items-start bg-card/15 rounded-3xl p-3 relative",
        classContainer
      )}
    >
      {title && <label className="text-xl text-blue-500">{title}</label>}
      {children && children}
      {description && (
        <label className={className ? className : ""}>{description}</label>
      )}
    </div>
  );
};

export default SelectedItemContainer;
