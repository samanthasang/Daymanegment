import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryParams() {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const getUrlWithNewQueryParam = useCallback(
		(name: string, value: string | number | false) => {
			const params = new URLSearchParams(
				searchParams as unknown as URLSearchParams,
			);

			// RESET PAGE NUMBER ON ADD FILTERS
			if (name !== "page" && params.has("page")) {
				if (+params.get("page")! > 1) {
					params.set("page", "1");
				}
			}
			// END RESET PAGE NUMBER

			if (value === false) {
				// REMOVE FILTER ACTION
				if (params.has(name)) {
					params.delete(name);
				}
			} else if (params.has(name)) {
				params.set(name, value.toString ? value.toString() : (value as string));
			} else {
				params.append(
					name,
					value.toString ? value.toString() : (value as string),
				);
			}
			// RETURNING NEW PAGE URL
			return pathname + "?" + params.toString();
		},
		[pathname, searchParams],
	);

	return { getUrlWithNewQueryParam };
}
