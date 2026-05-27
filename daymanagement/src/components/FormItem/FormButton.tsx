"use client";
import { Button } from "@/components/ui/button";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export default function FormButtons({
  onReset,
  resetOn,
}: {
  onReset: () => void;
  resetOn: boolean;
}) {
  const t: any = UseLangComponent("Form");

  return (
    <div className="flex gap-4">
      {resetOn && (
        <Button type="button" className="flex-1" onClick={() => onReset()}>
          {t.reset}
        </Button>
      )}
      <Button type="submit" variant="default" className="flex-1">
        {t.submit}
      </Button>
    </div>
  );
}
