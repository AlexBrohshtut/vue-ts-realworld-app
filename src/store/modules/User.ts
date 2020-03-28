import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import {
  IUser,
  IUserLoginRequestParams,
  IUserRegisterRequestParams,
  IUserUpdateRequestParams
} from "@/services/realWorldApi/models";
import {
  UserGetCurrent,
  UserLogin,
  UserRegister,
  UserUpdate
} from "@/services/realWorldApi/RealWorldApiUser";
import LocalStorageUtils from "@/utils/LocalStorageUtils";

import store from "../index";
import { ICurrentUser, IUserState } from "../models";
import modulesNames from "../modulesNames";
import { TransformICurrentUserToIUser } from "../transformers/IUserTransformers";

const AUTH_TOKEN_KEY = "realWorldAuthToken";

@Module({ dynamic: true, store, name: modulesNames.user })
class User extends VuexModule implements IUserState {
  private _currentUser?: ICurrentUser;
  private _authToken?: string = LocalStorageUtils.getItem(AUTH_TOKEN_KEY);

  get currentUser(): ICurrentUser | undefined {
    return this._currentUser;
  }

  get authToken(): string {
    return this._authToken || "";
  }

  get isLoggedIn(): boolean {
    return !!this._currentUser;
  }

  @Mutation
  private SET_CURRENT_USER(currentUser?: ICurrentUser): void {
    this._currentUser = currentUser;
  }

  @Mutation
  private SET_AUTH_TOKEN(authToken?: string): void {
    if (authToken) {
      this._authToken = authToken;
      LocalStorageUtils.setItem(AUTH_TOKEN_KEY, authToken);
    } else {
      this._authToken = undefined;
      LocalStorageUtils.removeItem(AUTH_TOKEN_KEY);
    }
  }

  @Mutation
  private SET_FROM_IUSER(user: IUser): void {
    this.SET_CURRENT_USER(TransformICurrentUserToIUser(user));
    this.SET_AUTH_TOKEN(user.token);
  }

  @Action
  async fetchCurrentUser(): Promise<void> {
    const res = await UserGetCurrent();
    this.SET_FROM_IUSER(res);
  }

  @Action
  async login(params: IUserLoginRequestParams): Promise<void> {
    const res = await UserLogin(params);
    this.SET_FROM_IUSER(res);
  }

  @Action
  async register(params: IUserRegisterRequestParams): Promise<void> {
    const res = await UserRegister(params);
    this.SET_FROM_IUSER(res);
  }

  @Action
  async update(params: IUserUpdateRequestParams): Promise<void> {
    const res = await UserUpdate(params);
    this.SET_FROM_IUSER(res);
  }

  @Action
  logout(): void {
    this.SET_AUTH_TOKEN(undefined);
    this.SET_CURRENT_USER(undefined);
  }
}

export default getModule(User);
