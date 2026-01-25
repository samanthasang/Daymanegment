"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/Drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAppDispatch } from "@/lib/hook"
import { cn } from "@/lib/utils"
import CategoryForm from "../Category/CategoryForm"
import FormHabbit from "../Habbit/AddHabbit/FormHabbit"
import FormReminder from "../Reminder/AddReminder/FormReminder"
import TagForm from "../Tags/TagForm"
import FormTimer from "../Timer/AddTimer/FormTimer"
import FormTodo from "../Todo/AddTodo/FormTodo"
import FormSpends from "../Spends/AddSpends/FormSpends"
import { selectToDoList } from "@/modules/toDoList/todo.slice"
import { selectHabbitList } from "@/modules/habbitList/habbit.slice"
import { selectTimerList } from "@/modules/timerList/timer.slice"
import { selectSpendsList } from "@/modules/spends/spends.slice"
import { selectReminderList } from "@/modules/reminderList/reminder.slice"


export function DrawerDialogDemo({
    drawerType,
    formType,
    children
  }: {
    drawerType: string,
    formType: string,
    children?: React.ReactNode;
  }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
    const dispatch = useAppDispatch();

  const openDrawer = (e: boolean) => {
    // console.log(e)
    if (e == false) {
      dispatch(selectToDoList(""))
      dispatch(selectHabbitList(""))
      dispatch(selectTimerList(""))
      dispatch(selectSpendsList(""))
      dispatch(selectReminderList(""))
    }
    console.log(drawerType)
    setOpen(e)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(e) => openDrawer(e)}>
        {children}
        <DialogContent className="max-w-[425px] sm:max-w-fit w-fit">
          <DialogHeader>
            <DialogTitle>{formType}</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <ProfileForm drawerType={drawerType} onSubmit={() => openDrawer(false)}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          {/* <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription> */}
        </DrawerHeader>
          <ProfileForm drawerType={drawerType} onSubmit={() => openDrawer(false)}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ drawerType, className, onSubmit }: { drawerType : string, className?: React.ComponentProps<"form">, onSubmit: () => void}) {
  switch (drawerType) {
    case "ReminderList":
      return <FormReminder onSubmitForm={onSubmit} />
    case "TodoList":
      return <FormTodo onSubmitForm={onSubmit} />
    case "HabbitList":
      return <FormHabbit />
    case "CategoryList":
      return <CategoryForm onSubmitForm={onSubmit}/>
    case "TagList":
      return <TagForm onSubmitForm={onSubmit}/>
    case "TimerList":
      return <FormTimer onSubmitForm={onSubmit}/>
    case "SpendsList":
      return <FormSpends onSubmitForm={onSubmit}/>
  
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
