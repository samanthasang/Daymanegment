import axiosBase from "axios";

const axios = axiosBase.create({
	baseURL: "",
	withCredentials: true,
	headers: {
		Accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export default axios;
