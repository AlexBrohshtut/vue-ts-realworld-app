import RealWorldApiBase from "./RealWorldApiBase";
import { IProfile } from "./Models";

class RealWorldApiProfile extends RealWorldApiBase {
  async Get(username: string): Promise<IProfile> {
    const res = await this.client.get(`/profiles:${username}`);
    return res?.data?.profile as IProfile;
  }

  async Follow(username: string): Promise<IProfile> {
    const res = await this.client.post(`/profiles:${username}/follow`);
    return res?.data?.profile as IProfile;
  }

  async Unfollow(username: string): Promise<IProfile> {
    const res = await this.client.delete(`/profiles:${username}/follow`);
    return res?.data?.profile as IProfile;
  }
}

export default new RealWorldApiProfile();
