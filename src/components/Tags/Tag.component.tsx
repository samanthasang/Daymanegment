"use client";
import { useAppDispatch } from "@/lib/hook";
import { delTagList, selectTagList, TTag } from "@/modules/tag/TagList.slice";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const TagList = ({ item }: { item: TTag }) => {
	const dispatch = useAppDispatch();

	return (
		<div className=" h-fit w-full bg-primary p-1.25 rounded-3xl flex flex-row justify-between items-center">
			<label className="px-2 py-1">{item.title}</label>
			<div className="flex gap-x-1 justify-start items-start">
				<Button
					onClick={(e) => {
						e && e.preventDefault();
						item.id && dispatch(delTagList(item.id));
					}}
					className="hover:bg-error/15"
					size="sm"
				>
					<Trash width="16px" height="16px" className="text-error" />
				</Button>
				<Button
					onClick={(e) => {
						e && e.preventDefault();
						item.id && dispatch(selectTagList(item.id));
					}}
					className="hover:bg-button/15"
					size="sm"
				>
					<Edit width="16px" height="16px" />
				</Button>
			</div>
		</div>
	);
};

export default TagList;
