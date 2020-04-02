import Vue from "vue";

export interface IRoutesNames {
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

const routesNames: Readonly<IRoutesNames> = {
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

declare module "vue/types/vue" {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Vue {
    $routesNames: IRoutesNames;
  }
}

export default routesNames;
