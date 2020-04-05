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

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.user })
class User extends VuexModule implements IUserState {
  private _currentUser?: ICurrentUser | null = null;
  private _authToken?: string = LocalStorageUtils.getItem(AUTH_TOKEN_KEY);

  get currentUser(): ICurrentUser | undefined | null {
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

  @Action({ rawError: true })
  private setFromIUser(user: IUser): void {
    this.SET_CURRENT_USER(TransformICurrentUserToIUser(user));
    this.SET_AUTH_TOKEN(user.token);
  }

  @Action({ rawError: true })
  async fetchCurrentUser(): Promise<void> {
    const res = await UserGetCurrent();
    this.setFromIUser(res);
  }

  @Action({ rawError: true })
  async login(params: IUserLoginRequestParams): Promise<void> {
    const res = await UserLogin(params);
    this.setFromIUser(res);
  }

  @Action({ rawError: true })
  async register(params: IUserRegisterRequestParams): Promise<void> {
    const res = await UserRegister(params);
    this.setFromIUser(res);
  }

  @Action({ rawError: true })
  async update(params: IUserUpdateRequestParams): Promise<void> {
    const res = await UserUpdate(params);
    this.setFromIUser(res);
  }

  @Action({ rawError: true })
  logout(): void {
    this.SET_AUTH_TOKEN(undefined);
    this.SET_CURRENT_USER(undefined);
  }

  @Action({ rawError: true })
  async completeAuth(): Promise<void> {
    if (this.authToken && !this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
  }
}

export default getModule(User);
