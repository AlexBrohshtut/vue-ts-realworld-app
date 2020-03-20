interface RoutesNames {
  home: string;

  authLogin: string;
  authRegister: string;

  articleCreate: string;
  articleEdit: string;
  articleView: string;

  profileIndex: string;
  profileSettings: string;
  profileFavorites: string;
}

const routesNames: Readonly<RoutesNames> = {
  home: "home",

  authLogin: "authLogin",
  authRegister: "authRegister",

  articleCreate: "articleCreate",
  articleEdit: "articleEdit",
  articleView: "articleView",

  profileIndex: "profileIndex",
  profileFavorites: "profileFavorites",
  profileSettings: "profileSettings"
};

export default routesNames;
