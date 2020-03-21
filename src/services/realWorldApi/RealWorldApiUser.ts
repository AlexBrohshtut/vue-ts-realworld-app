import {
  UserLoginRequestParams,
  UserRegisterRequestParams,
  UserUpdateRequestParams,
  IUser
} from "./Models";
import RealWorldApiBase from "./RealWorldApiBase";

class RealWorldApiUser extends RealWorldApiBase {
  async Login(params: UserLoginRequestParams): Promise<IUser> {
    const res = await this.client.post("/users/login", { user: params });
    return res?.data?.user as IUser;
  }

  async Register(params: UserRegisterRequestParams): Promise<IUser> {
    const res = await this.client.post("/users", { user: params });
    return res?.data?.user as IUser;
  }

  async GetCurrentUser(): Promise<IUser> {
    const res = await this.client.get("/user");
    return res?.data?.user as IUser;
  }

  async UpdateUser(params: UserUpdateRequestParams): Promise<IUser> {
    const res = await this.client.put("/user", { user: params });
    return res?.data?.user as IUser;
  }
}

export default new RealWorldApiUser();
