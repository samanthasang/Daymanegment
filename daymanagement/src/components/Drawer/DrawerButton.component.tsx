import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

function DrawerButton({
  drawerType,
  formType,
  children,
}: {
  drawerType: string;
  formType: string;
  children: React.ReactNode;
}) {
  return (
    <DrawerDialogDemo drawerType={drawerType} formType={formType}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer"
        >
          {children}
        </Button>
      </DialogTrigger>
    </DrawerDialogDemo>
  );
}

export default DrawerButton;
