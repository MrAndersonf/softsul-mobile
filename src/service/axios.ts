import axios from 'axios';
import { URL_PROD } from '@env';

const instance = axios.create({
	baseURL: URL_PROD,
});

instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default instance;
