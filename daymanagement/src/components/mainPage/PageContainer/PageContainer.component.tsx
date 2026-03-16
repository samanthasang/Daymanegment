import MenuSideBarComponent from "../MenuSideBar/MenuSideBar.component";

function PageContainer({
  witDate,
  children,
}: {
  witDate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full m-auto h-[100vh] p-3">
      <div className="w-full flex flex-row gap-3 h-full flex-1 relative">
        <MenuSideBarComponent witDate={witDate} />
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
