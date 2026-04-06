export const SelectedContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full flex flex-col flex-1 h-[calc(100vh-24px)] p-1 mx-auto rounded-3xl bg-secondary">
      {children}
    </div>
  );
};

export default SelectedContainer;
