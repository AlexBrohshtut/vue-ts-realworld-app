import IAuthor from "./IAuthor";
export default interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: IAuthor;
}
