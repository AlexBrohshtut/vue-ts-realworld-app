interface IModulesNames {
  user: string;
  article: string;
  profile: string;
}

const modulesNames: Readonly<IModulesNames> = {
  user: "user",
  article: "article",
  profile: "profile"
};

export default modulesNames;
