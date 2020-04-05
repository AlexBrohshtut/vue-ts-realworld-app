# Real World App using Vue + TypeScript

## Introduction

I was working only with Vue 2 + JavaScript, but as I wanted to move forward towards TS I needed to get my hands dirty, so I decided to go for RealWorldApp and implement front ent using Vue and TypeScript.

This application is going to include best practices and proper architecture for production ready front end application.

## Tooling

//TODO

## Setup

### Initialize app with **Vue CLI**

Vue CLI `v.4.2.3` is used to bootstrap the application, but mostly any version will do. It provides all necessary configuration to proceed.

1. Check version of Vue CLI using `vue —version` command, if it is not installed - run `yarn global add @vue/cli` to install it or `yarn global upgrade --latest @vue/cli` to update to latest version
1. Run `vue create vue-ts-realworld-app` in console to start application creation.
1. Pick **Manually select features**  
   [Picking a preset](./img/setup-first-step.png)
1. We need to pick here  
   **Babel** - because we want to use advanced ECMAScript features.  
   **TypeScript** - well, because we are here to use TypeScript.  
   **Router** - to use routes in our application.  
   **Vuex** - to use state in application.  
   **CSS Pre-processors** - to use some CSS in components and use CSS modules.  
   **Linter / Formatter** - to stay aligned with best practices.  
   **Unit Testing** - to test stuff  
   [Checking required features](./img/setup-second-step.png)
1. `Use class-style component syntax? (Y/n)` **Y**  
   We are going all-in into TypeScript, so we are going to write components like this:  
   [Class style component](./img/class-style-component.png)
1. `? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n)` **Y**  
   In order to support older browser and get polyfills automatically.
1. `? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)` **Y**  
   We will host our app on **Netlify**, so in order to get this working properly we will do a configuration later.
1. `? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):` you can pick here whatever flavor you like, I will go with `Sass/SCSS (with node-sass)`.
1. `? Pick a linter / formatter config:` Pick here `ESLint + Prettier`
1. `? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)` Whatever you like, I selected: `Lint on save`
1. `? Pick a unit testing solution: (Use arrow keys)` pick `Jest`
1. `? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)` - pick `In dedicated config files` for clearer structure.

### What we have so far

// TODO: Overview

## Router configuration

// TODO: Structure, routes names importance
// TODO: RoutesNames in prototype
// TODO: Module augmentation - https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
// TODO: Route watching
// TODO: Register hooks
// TODO: Don't forget next!!

## Services configuration

// TODO: Models folder, splitting to modules, intercepting and error handling

## Store configuration

// TODO: vuex-class vs vuex-modules-decorators what to choose? Why store is important? Writing store
// TODO: Mention params of decorators
// TODO: Mention that normal access to props working only in dynamic modules
// TODO: Initial values - https://github.com/championswimmer/vuex-module-decorators/issues/193
// TODO: Mutation in mutation
// TODO: Why caching?
// TODO: Payload only one parameter

## Components

// TODO: Tell about separation
// TODO: Tell about vue-property-decorators
// TODO: No watchers for you without vue-property-decorators...?
// TODO: "strictPropertyInitialization": false, to avoid Property 'article' has no initializer and is not definitely assigned in the constructor. / ! sign
// TODO: Watchers - immediate
// TODO: Initialization on the beginning
// TODO: Validation
// TODO: Watch is not aware of types
// TODO: Why reflect metadata?
