# Introduction

---
description: >-
  This is a full-stack React template that uses Node/Express on the backend, and
React/Redux/React Router on the front-end. It is still a work in progress, but
is designed to make creating these apps quicker in the future.
---

# Full-Stack-React-Template

## Developer Notes

### Starting the Application (Development)

1. `$ yarn && cd client && yarn && cd -`
2. Set Appropriate environment variables in `client/.env` & `server/.env` file (see `.env.example`)
3. Run MongoDB on your local system [see instructions here](https://docs.mongodb.com/manual/administration/install-community/)
4. Run `$ yarn start:dev` from `/server`
5. Run `$ yarn start` from `/client`

### Building the Apps for Production

Building the apps consists of transpiling the server and client code, and then
moving/copying files into a `/dist` folder in the project root.  This folder is
made so that it can be directly deployed to a hosting provider like Heroku, AWS,
Bluemix, etc.  `/client` and `/server` each have their own `package.json` with a
build command.  The project root has a `package.json` with a build command that
calls these two scripts, and then packages the files into the `/dist` folder.
Run using `$ yarn build` from project root.

### Project Info

*   **Repository:** [Full Stack React Boilerplate](https://github.com/austinoboyle/fullstack-react-boilerplate)
*   **Main Developers**: Austin

### Front End

*   **Framework:** React/Redux/React-Router
*   **Bootstrapped with:** create-react-app
*   **Build:** Webpack
*   **Styles:**
    *   scss modules
    *   postcss

#### Directory Structure

```bash
├── config: configuration files (jest, webpack, etc)
│   └── jest
├── public: `static files`
│   ├── img
│   ├── js
│   └── vendor
├── scripts: `create-react-app generated scripts for builds/tests`
└── src: React code
    ├── actions: `redux action creators (async ones use redux-thunk)`
    ├── components
    │   ├── layout: `Reused page-layout components (navbar, footer, etc)`
    │   │   └── Header
    │   ├── pages: `Top-level components rendered for React Router routes`
    │   │   ├── About
    │   │   └── Home
    │   ├── TodoApp
    │   ├── TodoFooter
    │   └── TodoItem
    ├── reducers: `redux reducers`
    └── scss: `Global scss files`
```

### Back End

*   **Server:** Node/Express
*   **Database:** MongoDB @mlab
*   **Bootstrapped with:** Express Generator
*   **Build:** Webpack

#### Directory Structure

```bash
├── bin: `binary files (run app with this)`
├── controllers: `route controllers, all route-handling logic goes here`
├── models: `mongoose database models`
├── routers: `api route definitions`
├── middleware: `custom middleware for routes`
├── views: `view files for production app`
├── loaders: `custom webpack loaders`
├── app.js: `main express app, on '/' route`
├── api.js: `separate express app for your api, proxied to /api route of main app`
├── webpack.config.js: `server webpack build config`
```

#### MongoDB Collection Schemas

#### Todos:

```javascript
{
    name: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
}
```

### API Endpoints

{% api "getAllTodos", method="GET", url="/api/todos/" %}

### Response

Returns an array with all todos in the db

```javascript
[
  { 
    _id: 'fdjsfdsa098123890a`,
    name: "Eat Vegetables",
    completed: 'False'
  },
  { 
    _id: 'fdjsfdsa0981238902`,
    name: "Buy Groceries",
    completed: 'False'
  }
]
```

{% endapi %}

{% api "addTodo", method="POST", url="/api/todos/" %}

### Request Body Parameters

| Name      | Type    | Desc                                |
| :-------- | :------ | :---------------------------------- |
| **name**  | String  | Name of todo                        |
| completed | Boolean | Is todo completed? (default: False) |

### Response

Returns db object with name, completed, and _id

```javascript
{ 
    _id: 'fdjsfdsa098123890a`,
    name: "Eat Vegetables",
    completed: 'False'
}
```


{% endapi %}

{% api "getTodo", method="GET", url="/api/todos/:id" %}

### Route Parameters

| Name   | Type   | Desc              |
| :----- | :----- | :---------------- |
| **id** | String | Object ID of todo |

### Response

Returns todo object corresponding to the id

```javascript
{ 
    _id: 'fdjsfdsa098123890a`,
    name: "Eat Vegetables",
    completed: 'False'
}
```

{% endapi %}


{% api "updateTodo", method="PUT", url="/api/comparisons/:id" %}

Update a todo in the db

### Route Parameters

| Name   | Type   | Desc              |
| :----- | :----- | :---------------- |
| **id** | String | Object ID of todo |

### Request Body Parameters

| Name      | Type    | Desc                          |
| :-------- | :------ | :---------------------------- |
| name      | String  | (optional) Name of todo       |
| completed | Boolean | (optional) Is todo completed? |

### Response

```javascript
{ 
    _id: 'fdjsfdsa098123890a`,
    name: "Updated Todo",
    completed: 'True'
}
```

{% endapi %}

{% api "deleteTodo", method="DELETE", url="/api/todos/:id" %}

Delete a Todo by id

### Route Parameters

| Name   | Type   | Desc              |
| :----- | :----- | :---------------- |
| **id** | String | Object ID of todo |

### Response

```javascript
{
    success: true,
    deleted: {...}
}

```

{% endapi %}

{% api "toggleAll", method="POST", url="/api/todos/toggleAll" %}

Toggle all todos` completed attribute to either `true` or `false`.

### Request Body Parameters

| Name         | Type    | Desc           |
| :----------- | :------ | :------------- |
| **toggleTo** | Boolean | Toggle to this |

### Response

```javascript
{
  success: true,
  updated: {...}
}
```

{% endapi %}


{% api "clearCompleted", method="POST", url="/api/todos/clearCompleted" %}

Delete all completed todos

### Response

```javascript
{
    success: true,
    deleted: {...}
}
```

{% endapi %}


### Testing

We test our apps using [Jest](https://facebook.github.io/jest/).  Jest is great
for both front-end and back-end tests.  To run the front-end/back-end tests,
change into `/client` or `server` respectively, and run `$ yarn test`.

#### Front-End Unit Tests 
For unit testing the React App, we use Jest with
[Enzyme](https://github.com/airbnb/enzyme).  Enzyme provides great utilities for
testing React Components.

*   **Test File Location:** `/client/src/folder/[moduleName].test.js`
    *   Component tests go in the same folder as the component!

#### Integration Tests

Integration tests are used to test different parts of the application working in
unison.  When making back-end integration tests, we are looking to make sure the
proper controllers, mongoose models, etc get called when we make a request to a
certain route.

**Test File Location:** `/server/__tests__/name.integration.test.js`


#### Back-end Unit Tests

I have personally found that unit-testing many parts of the back-end is
extremely cumbersome.  You end up writing so many mocks/stubs for functions that
work trivially.  There are times where it makes sense to unit test the back-end
(certainly for any pure functions, mongoose schema validation, etc), but it is
often a lot easier and more beneficial to write integration tests.

If you are going to unit-test the back-end, here are some of my recommendations:

**Controllers:**
* When testing controllers, you will want to use a library to mock the mongoose
  models being called.  Libraries that do this are `jest-mongoose-mock` and
  `mockgoose`.

**Models:**
* Testing model validation schemes is fairly easy, you can just create a new
  instance of the model & call instance.validate, and then check for errors.
* Testing instance methods is a little bit more involved.  You will likely have
  to stub/mock parts of the Model.  See [this
  article](https://codeutopia.net/blog/2016/06/10/mongoose-models-and-unit-tests-the-definitive-guide/)
  for more details
  
**Routes/Route Middleware:**
* Libraries like [supertest](https://github.com/visionmedia/supertest) make it
  pretty easy to test your APIs.  You will need to stub/mock your controllers to
  unit test these components.

