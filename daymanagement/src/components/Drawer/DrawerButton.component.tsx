import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

function DrawerButton({
  drawerType,
  formType,
  drawerTitle,
  className,
  children,
}: {
  drawerType: string;
  drawerTitle: string;
  formType: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <DrawerDialogDemo
      drawerType={drawerType}
      formType={formType}
      drawerTitle={drawerTitle}
    >
      <DialogTrigger asChild>
        <Button variant="default" className={className}>
          {children}
        </Button>
      </DialogTrigger>
    </DrawerDialogDemo>
  );
}

export default DrawerButton;
