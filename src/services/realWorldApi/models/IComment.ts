import IProfile from "./IProfile";
export default interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: IProfile;
}
