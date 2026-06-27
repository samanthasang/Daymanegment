"use client";
import { Button } from "@/components/ui/button";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { FieldErrors } from "react-hook-form";
import FormInstallmentsDetails from "../AddInstallments/FormInstallmentsDetails";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export default function FormInstallmentsDetailsList({
	onSubmitForm,
	installment,
	errors,
	onChangeinstallment,
}: {
	onSubmitForm: () => void;
	installment?: TInstallmentst[];
	onChangeinstallment: (install: TInstallmentst) => void;
	errors?: FieldErrors<{
		title: string;
		description: string;
		installmentstList: {
			isComplete: boolean;
			doDate: number;
			payment: string;
		}[];
		priority: string;
		paymentNumber: string;
		numberOfPayment: string;
		paymentCompleteValue: string;
		category: string;
		tag: string;
		startDate: string;
		lastUpdate: string;
		completeUpdate: string;
	}>;
}) {
	// const instalmentComplete =
	//   installment && installment.filter((ins) => ins.isComplete);

	// const instalmentNotComplete =
	//   installment && installment.filter((ins) => !ins.isComplete);

	// const lastInstalment =
	//   installment &&
	//   installment.length > 0 &&
	//   installment[installment.length - 1].doDate;

	// const lastComplete =
	//   instalmentComplete && instalmentComplete?.length > 0
	//     ? instalmentComplete[instalmentComplete.length - 1].doDate
	//     : lastInstalment;

	// const firstNOtComplete =
	//   instalmentNotComplete && instalmentNotComplete?.length > 0
	//     ? instalmentNotComplete[0].doDate
	//     : lastInstalment;

	// const lastNOtComplete =
	//   instalmentNotComplete && instalmentNotComplete?.length > 0
	//     ? instalmentNotComplete[instalmentNotComplete.length - 1].doDate
	//     : lastInstalment;

	const t: any = UseLangComponent("Form");
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex flex-col gap-y-2 w-full h-96 overflow-y-scroll">
				{installment &&
					errors &&
					installment.map((i) => (
						<FormInstallmentsDetails
							key={i.doDate}
							errors={errors}
							installment={i}
							onChangeinstallment={onChangeinstallment}
						/>
					))}
			</div>
			<Button className="w-full" onClick={() => onSubmitForm()}>
				{t.submit}
			</Button>
		</div>
	);
}
