import RealWorldApiBase from "./RealWorldApiBase";

class RealWorldApiTags extends RealWorldApiBase {
  async Get(): Promise<string[]> {
    const res = await this.client.get("/tags");
    return res?.data?.tags as string[];
  }
}

export default new RealWorldApiTags();
