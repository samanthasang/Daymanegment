import MenuSideBarComponent from "../MenuSideBar/MenuSideBar.component";

function PageContainer({
  witDate,
  children,
}: {
  witDate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-row gap-x-3 flex-1 relative m-auto h-[100vh] p-3">
      <MenuSideBarComponent witDate={witDate} />
      {children}
    </div>
  );
}

export default PageContainer;
