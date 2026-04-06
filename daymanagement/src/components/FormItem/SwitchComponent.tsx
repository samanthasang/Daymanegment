"use client";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";

function SwitchComponent({
  checkStatus,
  ChangeStatus,
  className,
  children,
}: {
  checkStatus?: boolean;
  ChangeStatus?: () => void;
  className: string;
  children: React.ReactNode;
}) {
  const { isSX } = useMediaQueryValues();
  return (
    <div
      onClick={(e) => {
        e && e.preventDefault();
        ChangeStatus && ChangeStatus();
      }}
      className={cn(
        "flex justify-center items-center h-10 flex-1 rounded-full min-w-10 hover:bg-button/15 w-full cursor-pointer",
        isSX ? "justify-center" : "justify-center ",
        checkStatus ? "bg-button" : "bg-primary",
        className
      )}
    >
      {children}
      {/* <BasicSwitch
        checked={checkStatus || false}
        handleToggle={(e) => {
          e && e.preventDefault();
          ChangeStatus && ChangeStatus();
        }}
        label=""
        key={"isComplete"}
      /> */}
    </div>
  );
}

export default SwitchComponent;
