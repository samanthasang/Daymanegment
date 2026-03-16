"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import SidebarDesktop from "./sidebarDesktop.componen";
import SidebarMobile from "./sidebarMobile.componen";
import SidebarTablet from "./sidebarTablet.componen";

function SidebarContainer({
  drawerType,
  formType,
  witDate = true,
  witAdd = true,
}: {
  drawerType: string;
  formType: string;
  witDate?: boolean;
  witAdd?: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isDesktop) {
    return (
      <SidebarDesktop
        drawerType={drawerType}
        formType={formType}
        witDate={witDate}
        witAdd={witAdd}
      />
    );
  }

  if (isMobile) {
    return <SidebarMobile drawerType={drawerType} formType={formType} />;
  }

  return <SidebarTablet drawerType={drawerType} formType={formType} />;
}

export default SidebarContainer;
