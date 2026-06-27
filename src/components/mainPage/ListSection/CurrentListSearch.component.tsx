"use client";

import { InputField } from "@/components/ui/inputField";
import UseResetFilterComponent from "@/lib/Hooks/ResetFilter.component";
import { useEffect, useState } from "react";
import ListContent from "./ListContainer/ListContent.component";
import ListDetails from "./ListDetails.component";
import ListDetailsByHourMinute from "./ListDetailsByHourMinute";

function CurrentListSearch({
	List,
	drawerType,
}: {
	List: [];
	drawerType: string;
}) {
	const [title, setTitle] = useState("");

	useEffect(() => {
		title != "" && List.filter((li: any) => li.title.includes(title));
	}, [title]);

	return (
		<>
			<div className="flex justify-center items-center gap-x-1 bg-secondary p-1.5 gap-y-2 rounded-3xl">
				<InputField
					title="Title"
					type="string"
					placeholder="Search . . ."
					className="flex-1 h-10"
					onChange={(e) => e && setTitle(e.target.value)}
				/>
				<UseResetFilterComponent />
			</div>
			<ListContent ListCount={List.length}>
					{drawerType == "Today" ? (
						<ListDetailsByHourMinute
							List={
								title.trim() != ""
									? (List.filter((li: any) =>
											li.title
												.toLowerCase()
												.includes(title.trim().toLowerCase()),
										) as [])
									: List
							}
							drawerType={drawerType}
						/>
					) : (
						<ListDetails
							List={
								title.trim() != ""
									? (List.filter((li: any) =>
											li.title
												.toLowerCase()
												.includes(title.trim().toLowerCase()),
										) as [])
									: List
							}
							drawerType={drawerType}
						/>
					)}
			</ListContent>
		</>
	);
}

export default CurrentListSearch;
