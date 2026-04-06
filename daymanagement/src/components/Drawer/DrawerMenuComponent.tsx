"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { AlarmOn } from "../icons";

export function DrawerMenu({
  formType,
  children,
}: {
  formType: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const openDrawer = (e: boolean) => {
    setOpen(e);
  };

  return (
    <Drawer open={open} onOpenChange={(e) => openDrawer(e)}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={
            "h-10 bg-transparent border-none flex-1 rounded-3xl hover:bg-slate-800 w-full cursor-pointer"
          }
        >
          <AlarmOn />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-full w-full bg-secondary backdrop-filter backdrop-blur-md">
        <DrawerHeader className="text-left">
          <DrawerTitle>{formType}</DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
