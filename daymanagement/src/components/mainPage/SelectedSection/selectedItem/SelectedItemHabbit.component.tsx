"use client";
import { Star, Stars } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export const SelectedItemHabbit = ({
  score,
  highest,
  drawerType,
}: {
  score?: number;
  highest?: number;
  drawerType?: string;
}) => {
  const t: any = UseLangComponent("Selected");
  return (
    (score || highest) && (
      <div className="w-full flex flex-row justify-between gap-x-2">
        {score && (
          <SelectedItemContainer title={t.Score}>
            <label
              className={
                (score && drawerType == "Goals" && score > 4) ||
                (score && drawerType == "Habbits" && score > 6)
                  ? "text-successGreen"
                  : "text-errorRed"
              }
            >
              <div className="flex flex-row items-center gap-x-0.5">
                <Star width={16} height={16} />
                {score}
              </div>
            </label>
          </SelectedItemContainer>
        )}
        {highest && (
          <SelectedItemContainer title={t.Highest}>
            <label className="text-successGreen">
              <div className="flex flex-row items-center gap-x-0.5">
                <Stars width={16} height={16} />
                {highest}
              </div>
            </label>
          </SelectedItemContainer>
        )}
      </div>
    )
  );
};

export default SelectedItemHabbit;
