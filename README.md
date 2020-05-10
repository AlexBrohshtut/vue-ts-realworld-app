[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/AlexBrohshtut/vue-ts-realworld-app) 

# vue-ts-realworld-app

![Netlify](https://img.shields.io/netlify/7c1bfa89-1389-44ed-b77d-55659ef2d317)

# ![RealWorld Example App](logo.png)

> ### [Vue.js + TypeScript] codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://vue-ts-realworld-app.netlify.com/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **[Vue.JS + TypeScript]** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **[Vue.JS + TypeScript]** community styleguides & best practices.

For more information on how to this works with other backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

### This code is explained in a series of articles:

- [Introduction](https://medium.com/p/cb89982c444)
- [Init and Linting setup](https://medium.com/p/74a1788340ac)
- [Basic views and routing setup](https://medium.com/p/496931f753fb)
- Services
- Store configuration
- Components and views
- Composition API + TSX (WIP in a [separate branch](https://github.com/AlexBrohshtut/vue-ts-realworld-app/tree/composition-api-tsx))

# Overview

## Intro

This application is meant to show fully working Vue application, written in TypeScript.
Application was scaffolded using `vue-cli` and as for now uses `vue-class-component` approach. Version with `composition-api` is WIP.

## Folders' structure overview

- `src/layots` - app's layouts - contains layouts of application, now there is only one footer and header
- `src/views` - app's views - basically all screens, that user sees
- `src/components` - reusable components used in views
- `src/router` - contains router logic:
  - `routesNames.ts` - dictionary of `RoutesNames` to refer in components
  - `routes.ts` - Vue Router `RouterConfig` - map of all application's routes
  - `index.ts` - Router's bootstrap and guards
- `src/services` - applications's services to access various APIs:
  - `realWorldApi/` - this folder contains all the logic required to access RealWorld API:
    - `models/` - models related to RealWorld API
    - `RealWorldApiBase.ts` - base client for RealWorld API. Contains error handling logic and authentication checking logic
    - `RealWorldApi(Article/Profile/Tags/User).ts` - wrapper for specific API's endpoints
  - `common` - classes not specifically related to any API - ResponseCodes and Pagination
- `src/store` - Vuex store for application
  - `models/` - models used in store
  - `modules/` - store modules
  - `transformers/` - transformers to convert between API's and store's models
- `src/utils` - various helper utilities

# Getting started

Clone the app:

```bash
git clone https://github.com/AlexBrohshtut/vue-ts-realworld-app
```

Go to app's directory:

```bash
cd vue-ts-realworld-app
```

Install dependencies:

```bash
yarn
```

And run it!

```bash
yarn serve
```

By default app will run on http://localhost:8080/
