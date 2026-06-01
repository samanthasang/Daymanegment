import { useAppSelector } from "@/lib/hook";
import MenuSideBarComponent from "../MenuSideBar/MenuSideBar.component";

function PageContainer({
  witDate,
  children,
}: {
  witDate?: boolean;
  children: React.ReactNode;
}) {
  const { lang } = useAppSelector((state) => state.Menu);
  return (
    <div
      dir={lang == "en" ? "ltr" : "rtl"}
      className="w-full flex flex-row gap-x-2 flex-1 relative m-auto h-[100vh] p-2"
    >
      <MenuSideBarComponent witDate={witDate} />
      <div className="flex flex-row gap-x-2 flex-1 w-full mx-auto">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
