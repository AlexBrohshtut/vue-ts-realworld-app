export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface IProfile {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IAuthor {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
}

export interface IArticleList {
  articles: IArticle[];
  articlesCount: number;
}

export interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: IAuthor;
}

export class UserLoginRequestParams {
  readonly email: string;
  readonly password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserRegisterRequestParams {
  readonly email: string;
  readonly password: string;
  readonly username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

export class UserUpdateRequestParams {
  readonly email: string;
  readonly bio: string;
  readonly image: string | null;
  constructor(email: string, bio: string, image: string | null) {
    this.email = email;
    this.bio = bio;
    this.image = image;
  }
}

export class ArticleGetListRequestParams {
  readonly tag?: string;
  readonly author?: string;
  readonly favorited?: string;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  ) {
    this.tag = tag;
    this.author = author;
    this.favorited = favorited;
    this.limit = limit;
    this.offset = offset;
  }
}

export class ArticleGetFeedRequestParams {
  readonly limit?: number;
  readonly offset?: number;

  constructor(limit?: number, offset?: number) {
    this.limit = limit;
    this.offset = offset;
  }
}

export class ArticleCreateRequestParams {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList?: string[];

  constructor(
    title: string,
    description: string,
    body: string,
    tagList?: string[]
  ) {
    this.title = title;
    this.description = description;
    this.body = body;
    this.tagList = tagList;
  }
}

export class ArticleUpdateRequestParams {
  readonly title?: string;
  readonly description?: string;
  readonly body?: string;

  constructor(title?: string, description?: string, body?: string) {
    this.title = title;
    this.description = description;
    this.body = body;
  }
}

export class ArticleAddCommentRequestParams {
  readonly body: string;
  constructor(body: string) {
    this.body = body;
  }
}
