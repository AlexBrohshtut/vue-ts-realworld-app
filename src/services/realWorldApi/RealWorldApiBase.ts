import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import HttpStatusCodes from "../HttpStatusCodes";
import router from "@/router";
import routesNames from "@/router/routesNames";

abstract class RealWorldApiBase {
  protected readonly client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REAL_WORLD_API_URL,
      timeout: 5000
    });
    this.initializeClientHeaders();
    this.initializeRequestInterceptors();
    this.initializeResponseInterceptors();
  }

  private initializeClientHeaders() {
    this.client.defaults.headers.get.Accepts = "application/json";
    this.client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  }

  private initializeRequestInterceptors() {
    this.client.interceptors.request.use(AuthInterceptor);
  }

  private initializeResponseInterceptors() {
    this.client.interceptors.response.use(OnResponseSuccess, OnResponseFailure);
  }
}

const AuthInterceptor = (config: AxiosRequestConfig) => {
  //TODO: Get real accessToken
  const accessToken = "";
  if (accessToken) config.headers.Authorization = `Token ${accessToken}`;
  return config;
};

const OnResponseSuccess = (response: AxiosResponse<any>) => response;

const OnResponseFailure = (error: any) => {
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

export default RealWorldApiBase;
