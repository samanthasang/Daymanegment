"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/use-media-query"
import FormTodo from "../Reminder/AddReminder/FormReminder"
import FormHabbit from "../Habbit/AddHabbit/FormHabbit"
import { useAppDispatch } from "@/lib/hook"
import { selectToDoList } from "@/modules/toDoList/todo.slice"
import { More } from "@/components/table";


export function DrawerDialogDemo({
  drawerType,
  formType
}: {
    drawerType: string,
    formType: string
  }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
    const dispatch = useAppDispatch();

  const openReminderDrawer = (e: boolean) => {
    console.log(e)
    console.log(drawerType)
    if (formType == 'add') {
      dispatch(selectToDoList(""));
    }
    setOpen(e)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(e) => openReminderDrawer(e)}>
        <DialogTrigger asChild>
          <Button variant="outline"><More /></Button>
        </DialogTrigger>
        <DialogContent onSubmit={() => openReminderDrawer(false)} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm drawerType={drawerType} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline"><More /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
          <ProfileForm drawerType={drawerType} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ drawerType, className }: { drawerType : string, className?: React.ComponentProps<"form">}) {
  switch (drawerType) {
    case "ReminderList":
      return <FormTodo />
    case "TodoList":
      return <FormTodo />
    case "HabbitList":
      return <FormHabbit />
  
    default:
    return (
      <form className={cn("grid items-start gap-6", className)}>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" defaultValue="shadcn@example.com" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    )
      break;
  }
}
