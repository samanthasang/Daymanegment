import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "./axios.instance";

const axiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (params) => {
		try {
			const result = await axios({ ...params });
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export default axiosBaseQuery;
