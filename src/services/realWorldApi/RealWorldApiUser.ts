import {
  UserLoginRequestParams,
  UserRegisterRequestParams,
  UserUpdateRequestParams,
  IUser
} from "./Models";
import RealWorldApiInstance from "./RealWorldApiBase";

export const UserLogin = async (
  params: UserLoginRequestParams
): Promise<IUser> => {
  const res = await RealWorldApiInstance.post("/users/login", { user: params });
  return res?.data?.user as IUser;
};

export const UserRegister = async (
  params: UserRegisterRequestParams
): Promise<IUser> => {
  const res = await RealWorldApiInstance.post("/users", { user: params });
  return res?.data?.user as IUser;
};

export const UserGetCurrent = async (): Promise<IUser> => {
  const res = await RealWorldApiInstance.get("/user");
  return res?.data?.user as IUser;
};

export const UserUpdate = async (
  params: UserUpdateRequestParams
): Promise<IUser> => {
  const res = await RealWorldApiInstance.put("/user", { user: params });
  return res?.data?.user as IUser;
};
