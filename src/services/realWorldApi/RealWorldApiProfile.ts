import { IProfile } from "./models";
import RealWorldApiInstance from "./RealWorldApiBase";

const PROFILES_PATH = "/profiles";

export const ProfileGet = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.get(`${PROFILES_PATH}:${username}`);
  return res?.data?.profile as IProfile;
};

export const ProfileFollow = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.post(
    `${PROFILES_PATH}:${username}/follow`
  );
  return res?.data?.profile as IProfile;
};

export const ProfileUnfollow = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.delete(
    `${PROFILES_PATH}:${username}/follow`
  );
  return res?.data?.profile as IProfile;
};
