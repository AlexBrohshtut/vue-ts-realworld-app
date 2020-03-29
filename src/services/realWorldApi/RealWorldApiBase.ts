import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import router from "@/router";
import routesNames from "@/router/routesNames";
import HttpStatusCodes from "@/services/common/HttpStatusCodes";
import User from "@/store/modules/User";

import { transformErrors } from "./Utils";

const AuthInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = User.authToken;
  if (accessToken) config.headers.Authorization = `Token ${accessToken}`;
  return config;
};

const OnResponseSuccess = (response: AxiosResponse<any>): AxiosResponse<any> =>
  response;

const OnResponseFailure = (error: any): Promise<any> => {
  const httpStatus = error?.response?.status;

  const errors = transformErrors(error?.response?.data?.errors);

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
  return Promise.reject(errors);
};

const instance: Readonly<AxiosInstance> = axios.create({
  baseURL: process.env.VUE_APP_REAL_WORLD_API_URL,
  timeout: 5000
});

instance.defaults.headers.get.Accepts = "application/json";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

instance.interceptors.request.use(AuthInterceptor);

instance.interceptors.response.use(OnResponseSuccess, OnResponseFailure);

export default instance;
