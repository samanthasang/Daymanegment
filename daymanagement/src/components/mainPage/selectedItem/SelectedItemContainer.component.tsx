export const SelectedItemContainer = ({
  title,
  description,
  className,
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full bg-primary rounded-3xl p-3 gap-x-3 relative">
      <div className="w-full flex flex-col flex-1 gap-2 justify-start items-start">
        {title && <label className="text-xl text-blue-500">{title}</label>}
        {children ? (
          children
        ) : (
          <label className={className}>{description}</label>
        )}
      </div>
    </div>
  );
};

export default SelectedItemContainer;
