import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import qs from "qs";

const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints() {
		return {};
	},
	keepUnusedDataFor: 30,
	reducerPath: "@api",
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: false,
	serializeQueryArgs: (args) =>
		qs.stringify(args, { encodeValuesOnly: true }),
});

export default apiService;
