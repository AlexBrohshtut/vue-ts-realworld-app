import ICurrentUser from "./ICurrentUser";

export default interface IUserState {
  currentUser?: ICurrentUser | null;
  authToken?: string;
}
