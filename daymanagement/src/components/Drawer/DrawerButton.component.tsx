import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

function DrawerButton({
  drawerType,
  formType,
  className,
  children,
}: {
  drawerType: string;
  formType: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <DrawerDialogDemo drawerType={drawerType} formType={formType}>
      <DialogTrigger asChild>
        <Button variant="default" className={className}>
          {children}
        </Button>
      </DialogTrigger>
    </DrawerDialogDemo>
  );
}

export default DrawerButton;
