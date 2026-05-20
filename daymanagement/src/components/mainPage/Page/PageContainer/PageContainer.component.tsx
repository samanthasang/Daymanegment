import PWAInstallPrompt from "@/app/PWAInstallPrompt";
import MenuSideBarComponent from "../MenuSideBar/MenuSideBar.component";

function PageContainer({
  witDate,
  children,
}: {
  witDate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-row gap-x-2 flex-1 relative m-auto h-[100vh] p-2">
      <PWAInstallPrompt />
      <MenuSideBarComponent witDate={witDate} />
      <div className="flex flex-row gap-x-2 flex-1 w-full mx-auto">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
