import RealWorldApiInstance from "./RealWorldApiBase";
import { IProfile } from "./Models";

export const ProfileGet = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.get(`/profiles:${username}`);
  return res?.data?.profile as IProfile;
};

export const ProfileFollow = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.post(`/profiles:${username}/follow`);
  return res?.data?.profile as IProfile;
};

export const ProfileUnfollow = async (username: string): Promise<IProfile> => {
  const res = await RealWorldApiInstance.delete(`/profiles:${username}/follow`);
  return res?.data?.profile as IProfile;
};
