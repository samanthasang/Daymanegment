import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export const SelectedContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSX } = useMediaQueryValues();
  return (
    <div
      className={cn(
        "relative flex flex-col h-[calc(100vh-18px)] p-1.5 mx-auto rounded-3xl bg-secondary",
        isSX ? "w-full" : "w-1/2"
      )}
    >
      {children}
    </div>
  );
};

export default SelectedContainer;
