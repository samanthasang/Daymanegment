"use client";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { changeFilterStatuse } from "@/modules/menu/menu.slice";
import duration from "dayjs/plugin/duration";
import ListItemCatTag from "./ListItemCatTag.component";
import ListItemDetails from "./ListItemDetails.component";
import ListItemTitle from "./ListItemTitle.component";

export const ListItem = ({
	id,
	priority,
	title,
	category,
	tag,
	isComplete,
	isFinish,
	isPause,
	date,
	diff,
	score,
	incomeAmount,
	outcomeAmount,
	total,
	hasShare,
	withShare,
	priceOfProduct,
	drawerType,
	visitId,
	spendsId,
	paymentCompleteValue,
	withDel = true,
	selectedID,
	shareList,
	SelectItem,
	DelItem,
	CompleteItem,
	BringToday,
	UpdateItem,
}: {
	selectedID?: string;
	id?: string;
	priority?: string;
	title: string;
	category?: string;
	incomeAmount?: string;
	outcomeAmount?: string;
	priceOfProduct?: string;
	visitId?: string;
	spendsId?: string;
	tag?: string;
	isComplete?: boolean;
	isPause?: boolean;
	withShare?: boolean;
	isFinish?: boolean;
	withDel?: boolean;
	date?: string | number;
	diff?: duration.Duration;
	score?: number;
	total?: number;
	hasShare?: number;
	drawerType: string;
	paymentCompleteValue?: string;
	shareList?: string[];
	SelectItem?: () => void;
	DelItem?: () => void;
	CompleteItem?: () => void;
	BringToday?: () => void;
	UpdateItem?: () => void;
}) => {
	const dispatch = useAppDispatch();
	const { OpenFilter } = useAppSelector((state) => state.Menu);

	const { isSX, isMDMax, isSMMin, isLGMin, isLGMax } = useMediaQueryValues();

	const showDetails =
		isSX ||
		(isSMMin && isMDMax && !selectedID) ||
		(isLGMin && (!OpenFilter || !selectedID));

	return (
		<div
			onClick={() => {
				isLGMax && OpenFilter && dispatch(changeFilterStatuse());
				id && SelectItem && SelectItem();
			}}
			className={cn(
				"w-full h-fit cursor-pointer flex flex-row justify-start items-center gap-x-2 p-2 rounded-3xl hover:bg-card/15",
				selectedID == id ? "bg-card/15" : "bg-secondary",
			)}
		>
			<div className="select-none cursor-pointer flex flex-col flex-1 gap-2 justify-start items-start">
				<ListItemTitle
					drawerType={drawerType}
					title={title}
					incomeAmount={incomeAmount}
					priceOfProduct={priceOfProduct}
					priority={priority}
					withShare={withShare}
					visitId={visitId}
					spendsId={spendsId}
					paymentCompleteValue={paymentCompleteValue}
					isPause={isPause}
					isFinish={isFinish}
				/>
				<ListItemCatTag
					id={id}
					tag={tag}
					category={category}
					hasShare={(drawerType == "Friends" && shareList?.length) || 0}
				/>
			</div>
			{showDetails && (
				<ListItemDetails
					id={id}
					title={title}
					isComplete={isComplete}
					isFinish={isFinish}
					isPause={isPause}
					date={date}
					score={score}
					hasShare={shareList && shareList?.length > 0}
					drawerType={drawerType}
					withDel={withDel}
					diff={diff}
					incomeAmount={incomeAmount}
					outcomeAmount={outcomeAmount}
					total={total}
					priceOfProduct={priceOfProduct}
					DelItem={DelItem}
					CompleteItem={CompleteItem}
					BringToday={BringToday}
					UpdateItem={UpdateItem}
				/>
			)}
		</div>
	);
};

export default ListItem;
