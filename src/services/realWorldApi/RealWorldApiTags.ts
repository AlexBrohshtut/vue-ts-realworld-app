import RealWorldApiInstance from "./RealWorldApiBase";

export const TagsGet = async (): Promise<string[]> => {
  const res = await RealWorldApiInstance.get("/tags");
  return res?.data?.tags as string[];
};
