import { ICurrentUser } from "../models";
import { IUser } from "@/services/realWorldApi/models";

export const TransformICurrentUserToIUser = (iUser: IUser): ICurrentUser => {
  return {
    bio: iUser.bio,
    email: iUser.email,
    image: iUser.image,
    username: iUser.username
  };
};
