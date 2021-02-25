import { ErrorHandler } from './errorHandler';
import axios, { AxiosInstance } from 'axios';
import { Service } from 'vue-di-container';

@Service()
export default class AxiosService {

    public axiosInstance: AxiosInstance;
    constructor() {
        const config = {
            baseURL: process.env.BASE_URL,
            // timeout: 60 * 1000, // Timeout
            // withCredentials: true, // Check cross-site Access-Control
        };
        this.axiosInstance = axios.create(config);
        this.axiosInstance.interceptors.request.use(
            (axiosRequestConfig) => axiosRequestConfig,
            (error) => ErrorHandler.errorResponseHandler(error),
        );

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(
            (axiosResponse) => axiosResponse,
            (error) => {
                ErrorHandler.errorResponseHandler(error);
            },
        );
    }
}
