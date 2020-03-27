import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import HttpStatusCodes from "../HttpStatusCodes";
import router from "@/router";
import routesNames from "@/router/routesNames";
import User from "@/store/modules/User";

const AuthInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  //TODO: Get real accessToken
  const accessToken = User.authToken;
  if (accessToken) config.headers.Authorization = `Token ${accessToken}`;
  return config;
};

const OnResponseSuccess = (response: AxiosResponse<any>): AxiosResponse<any> =>
  response;

const OnResponseFailure = (error: any): Promise<any> => {
  const httpStatus = error?.response?.status;

  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      //TODO: Logout user here
      router.push({ name: routesNames.authLogin });
      //TODO: Notify about not logged it
      break;
    case HttpStatusCodes.NOT_FOUND:
      //TODO: Notify about not found
      break;
    case HttpStatusCodes.FORBIDDEN:
      //TODO: Notify about forbidden
      break;
    case HttpStatusCodes.UNPROCESSABLE_ENTITY:
      //TODO: Notify about UNPROCESSABLE_ENTITY
      break;
    default:
      //TODO: Notify about unknown status code
      break;
  }
  return Promise.reject(error);
};

const instance: Readonly<AxiosInstance> = axios.create({
  baseURL: process.env.REAL_WORLD_API_URL,
  timeout: 5000
});

instance.defaults.headers.get.Accepts = "application/json";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

instance.interceptors.request.use(AuthInterceptor);

instance.interceptors.response.use(OnResponseSuccess, OnResponseFailure);

export default instance;
