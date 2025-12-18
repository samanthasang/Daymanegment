import { useCallback } from "react";
import useQueryParams from "./useQueryParams";

export default function  useFilters() {
	const { getUrlWithNewQueryParam } = useQueryParams();

	const getUrlWithParams = useCallback(
		(
			parameter: string,
			value: string | number | Array<unknown> | false,
		) => {
			let url = "";
			if (Array.isArray(value)) {
				if (value.length === 0) {
					url = getUrlWithNewQueryParam(parameter, false);
				} else {
					url = getUrlWithNewQueryParam(parameter, value.toString());
				}
			} else if (typeof value === "number") {
				url = getUrlWithNewQueryParam(parameter, value.toString());
			} else if (typeof value === "string" && value.length === 0) {
				url = getUrlWithNewQueryParam(parameter, false);
			} else {
				url = getUrlWithNewQueryParam(parameter, value);
			}
			return url;
		},
		[getUrlWithNewQueryParam],
	);

	const applyFilter = useCallback(
		(
			parameter: string,
			value: string | number | Array<unknown> | false,
		) => {
			const url = getUrlWithParams(parameter, value);
			return window.history.pushState(null, "", url);
		},
		[getUrlWithParams],
	);
	return { applyFilter, getUrlWithParams };
}
