"use client";
import DrawerButton from "@/components/Drawer/DrawerButton.component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Edit, ListStart, Trash } from "lucide-react";

export const SelectedMenuBottom = ({
	drawerType,
	formType,
	drawerTitle,
	isFinish,
	isComplete,
	isPause,
	SelectItem,
	DelItem,
	CompleteItem,
	FinishItem,
}: {
	isFinish?: boolean;
	isComplete?: boolean;
	isPause?: boolean;
	drawerType: string;
	formType: string;
	drawerTitle: string;
	SelectItem: () => void;
	DelItem?: () => void;
	CompleteItem?: () => void;
	FinishItem?: () => void;
}) => {
	return (
		<div className="flex justify-center items-center gap-x-1 bg-secondary p-1.5 gap-y-2 rounded-3xl">
			<Button
				className="flex-1"
				onClick={(e) => {
					e && e.preventDefault();
					SelectItem();
				}}
				variant="default"
			>
				<ListStart width={16} height={16} />
			</Button>
			{drawerType != "Spends" && DelItem && CompleteItem && (
				<Button
					disabled={isComplete && isPause && isFinish}
					onClick={(e) => {
						e && e.preventDefault();
						e && !isComplete && !isPause && !isFinish && CompleteItem();
					}}
					className={cn("flex-1", isComplete ? "bg-success" : "bg-primary")}
				>
					<CheckCircle width={16} height={16} />
				</Button>
			)}
			{DelItem && (
				<Button
					onClick={(e) => {
						e && e.preventDefault();
						e && e.stopPropagation();
						e && DelItem();
					}}
					className="hover:bg-error/30 flex-1"
				>
					<Trash width="16px" height="16px" className="text-error" />
				</Button>
			)}
			<DrawerButton
				drawerType={drawerType}
				formType={formType}
				drawerTitle={drawerTitle}
				className="flex-1"
			>
				<Edit />
			</DrawerButton>
		</div>
	);
};

export default SelectedMenuBottom;
