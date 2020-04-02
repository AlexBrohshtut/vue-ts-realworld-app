export default interface IUserUpdateRequestParams {
  email: string;
  bio: string;
  image: string | null;
  password: string | null;
  username: string;
}
