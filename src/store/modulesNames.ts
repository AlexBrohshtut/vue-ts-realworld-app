interface IModulesNames {
  user: string;
  article: string;
  profile: string;
  tags: string;
}

const modulesNames: Readonly<IModulesNames> = {
  user: "user",
  article: "article",
  profile: "profile",
  tags: "tags"
};

export default modulesNames;
