import { ButtonGroup } from "@/components/ui/buttonGroup";
import { Field, FieldError } from "@/components/ui/field";
import { useAppSelector } from "@/lib/hook";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import React from "react";
import { formatDate } from "./FormatDateToPersian";

export function ClendarButtonGroup({
	dateValue,
	children,
	description,
	errors,
}: {
	dateValue: Date | undefined;
	description?: string;
	errors: boolean;
	children: React.ReactNode;
}) {
	const { lang } = useAppSelector((state) => state.Menu) || { lang: "en" };

	const t: any = UseLangComponent("Form");
	return (
		<Field data-invalid={errors}>
			<ButtonGroup>
				<div
					className={cn(
						"flex h-8 w-full rounded-xl border border-border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						!dateValue && "text-muted-foreground",
						errors && " border-red-500",
					)}
				>
					{dateValue ? formatDate(dateValue, lang) : <span>{t.PickDate}</span>}
				</div>
				<div>{children}</div>
			</ButtonGroup>
			{description && <FieldError>{description}</FieldError>}
		</Field>
	);
}
