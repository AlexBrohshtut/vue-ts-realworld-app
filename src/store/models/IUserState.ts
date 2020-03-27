import ICurrentUser from "./ICurrentUser";

export default interface IUserState {
  currentUser?: ICurrentUser;
  authToken?: string;
}
