"use client";
import {
  CheckCircle,
  Info,
  ListCheck,
  ListIcon,
  ListPlus,
  ListRestart,
  ListStart,
  ListTodo,
} from "lucide-react";

export function DrawerIcon({
  drawerType,
  formType,
}: {
  drawerType?: string;
  formType: string;
}) {
  switch (formType) {
    case "Add":
      return <ListPlus />;
    case "duplicate":
      return <ListPlus />;
    case "Edit":
      return <ListRestart />;
    case "Info":
      return <Info />;
  }
}
