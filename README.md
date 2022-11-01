<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/customer-management/tree/main/server">
    <img src="assets/img/customer-management-logo.png" alt="Logo" width="130">
  </a>

  <h3 align="center">Customer Management System PoC</h3>
  <div align="center">
    Full Stack Development Project 
    <br />
    <a href="https://github.com/NivaldoFarias/customer-management/tree/main/server"><strong>Browse Back End code»</strong></a>
    -
    <a href="https://github.com/NivaldoFarias/customer-management/tree/main/client"><strong>Browse Front End code»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/customer-management" alt="MIT license badge">
    <img src="https://img.shields.io/badge/license-MIT-%23A8D1FF?style=flat-square" />
  </a>
</div>

<!-- Table of Contents -->

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation and Usage](#installation-and-usage)
  - [Pre-requisites](#pre-requisites-nodejs-18120-lts)
- [Error Handling and Logging](#error-handling-and-logging)
  - [AppError](#--apperror)
  - [AppLog](#--applog)
- [Middlewares](#middlewares)
- [API Reference](#api-reference)
  - [Models](#models)
  - [Routes](#routes)
- [Database Entities](#database-entities)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Cooks](#cooks)
  - [Suppliers](#suppliers)
  - [Provisions](#provisions)

# Installation and Usage

###### Pre-requisites: Node.js `^16.14.0`, TypeScript `^4.7.4`

Download the zip file and extract it in the root of a new project folder by running these commands:

```bash
wget https://github.com/NivaldoFarias/customer-management/archive/main.zip
```

Then run the following command to install the project's dependencies:

```bash
npm install
```

That's it! You can now start developing your TypeScript Project by running the command below. Happy coding!

```bash
npm run dev
```

<!-- Error Handling and Logging -->

# Error Handling and Logging

While dealing with errors in a _Layered Structure_ Project enviroment, you may notice that the project's debugging complexity scales beyond common `console.log()` usage. The `AppLog` Object and `AppError` Object structures were set to counter that exact issue, by trying to keep the Development process as clean and concise as possible. Both are frequently referenced in the code, but do have a specific usage.

#### ▸ &nbsp; AppError

An `AppError` Object is used to handle errors in the application. It that takes four parameters:

- `log`: A string containing a simplified error message, for _Server side_ use. **This is the message that will be used by the `AppLog` Object**
- `statusCode`: An integer containing the HTTP status code.
- `message`: A string containing a simplified error message, for _Client side_ use. **This is the message that will be displayed to the user.**
- `details`: A string containing a detailed error message, for _Client side_ use. Can be used to provide more information about the error, such as the stack trace, or suggestions on how to counter the error.

##### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import * as repository from './../repositories/auth.repository.ts';
  import AppError from './../events/AppError';
  ...
  ..

  async function usersExists(req: Request,...){
    ...
    ..
    const user = await repository.findbyId(req.body.id);

    if (!user){
      throw new AppError(
        'User not found',
        404,
        'User not found',
        'Ensure to provide a valid user ID.'
      );
    }
    ..
    ...
  }
```

#### ▸ &nbsp; AppLog

An `AppLog` Object is used to handle logs in the application. It takes two parameters:

- `type`: A string containing the main _Layer Structure_ that contains the log. There are seven allowed values: `Error`, `Server`, `Controller`, `Middleware`, `Repository`, `Service`, and `Util`.
- `text`: A descriptive string containing the log message. Generally, a short message that describes the output event of the function that generated the log.

##### Example Usage

```typescript
  // ..../middlewares/auth.middleware.ts

  import AppLog from './events/AppLog';
  ...
  ..

  async function usersExists(req: Request,...){
    ...
    ..

    // output: [Middleware] User Found
    AppLog('Middleware', 'User found');
    res.locals.user = user;
    return next();
  }
  ..
  ...
```

<!-- Middlewares -->

# Middlewares

While aiming to provide a reusable, modular and extensible architecture, the middlewares are generally the first structures to be refactored into self-contained modules. The `validateSchema()`, `processHeader()` and `requireToken()` middlewares were set in order to achieve that goal. The following section describes **`useMiddleware()`**, which incorporates the forementioned functions as _key–value_ pairs in an Object, along with their structure and usage.

### ‣ &nbsp;UseMiddleware

The `useMiddleware()` function takes two parameters:

- `middlewares`: An Object containing the _key–value_ pairs of the middlewares to be used, takes one to three parameters:
  - `schema`: A [Joi](https://joi.dev/api/) Schema Object that will be used to validate the data provided by the client. If the data provided by the client is not valid, an **`AppError`** Object will be thrown.
  - `header`: A string containing the name of the header that will be used to authenticate the action. If the client-provided header is missing, an **`AppError`** Object will be thrown.
  - `token`: A boolean indicating whether the token provided by the client will be verified or not. If the token is not valid, an **`AppError`** Object will be thrown.
- `endpoint`: A string that will be used to identify the endpoint at which the _client–api_ interaction is undergoing, which will be logged to console by the **`AppLog`** Object.

###### Reference: [useMiddleware function declaration](https://github.com/NivaldoFarias/typescript-project-template/blob/main/src/utils/middleware.util.ts)

##### Example Usage

```typescript
// ..../routes/admin.route.ts
import useMiddleware from '../utils/middleware.util';
import * as schema from '../models/admin.model';
...
..
const endpoint = '/admin';

const registerEndpoint = '/create';
adminRouter.post(endpoint,
  createEndpoint,
  useMiddleware({
    schema: schema.create,
    header: 'admin-api-key',
    token: true
  },
  endpoint + createEndpoint),
  middleware.createValidations,
  controller.create,
);
..
...
```

# API Reference

In this section, you will find the example API's endpoints and their respective descriptions, along with the request and response examples, as well as the [MongoDB](https://www.mongodb.com/) **_BSON_** types for each entity, that can be used as guide for data formatting. All data is sent and received as **_JSON_**.

<!-- Models -->

## Models

### User model _`User`_

- `_id`: A unique identifier for each user. `ObjectId`
- `name`: The user's full name. `String` `required` `max(100)`
- `email`: The user's registered email. `String` `required` `unique`
- `password`: The user's password. `String` `required` `max(100)`
- `created_at`: The date and time when the user was created. `Date`

### Cook model _`Cook`_

- `_id`: A unique identifier for each cook. `ObjectId`
- `user`: A Object Id referencing the relative user. `User ObjectId`
- `cir`: The cook's unique registry number **_(Número da caderneta de inscrição e Registro)_** `String` `required` `unique` `max(7)`
- `created_at`: The date and time when the cook was created. `Date`

### Supplier model _`Supplier`_

- `_id`: A unique identifier for each supplier. `ObjectId`
- `user`: A Object Id referencing the relative user. `User ObjectId`
- `name`: The supplier's company name. `String` `required` `max(100)`
- `cnpj`: The supplier's unique registry number **_(CNPJ)_** `String` `required` `unique` `max(14)`
- `created_at`: The date and time when the supplier was created. `Date`


### Provision model _`Provision`_

- `_id`: A unique identifier for each provision. `ObjectId`
- `user`: A Object Id referencing the relative user. `User ObjectId`
- `type`: The provision's type. `enum { 'Feijão' | 'Arroz' | 'Macarrão' }` `required`
- `created_at`: The date and time when the provision was created. `Date`

## Routes

### [Authentication](#authentication) _`/auth`_

- [Sign In](#---sign-in)
- [Sign Out](#---sign-out) `token`

### [Users](#users) _`/users`_

- [Create](#---create-an-user) 
- [Search All Users](#---search-all-users) `token`
- [Search by Id](#---search-user-by-id) `token`
- [Delete](#---delete-an-user) `token` 

### [Cooks](#cooks) _`/cooks`_

- [Create](#---create-an-cook) `token` 
- [Search All Cooks](#---search-all-cooks) `token`
- [Search by Id](#---search-cook-by-id) `token`
- [Delete](#---delete-an-cook) `token` 

### [Suppliers](#suppliers) _`/suppliers`_

- [Create](#---create-a-supplier) 
- [Search All Suppliers](#---search-all-suppliers) `token`
- [Search by Id](#---search-suppliers-by-id) `token`
- [Delete](#---delete-a-supplier) `token` 


### [Provisions](#provisions) _`/provisions`_

- [Create](#---create-an-provision) `token` 
- [Search All Provisions](#---search-all-provisions) `token`
- [Search by Id](#---search-provision-by-id) `token`
- [Delete](#---delete-an-provision) `token` 

<!-- Database Entities -->

# Database Entities
## Authentication

### &nbsp; ‣ &nbsp; Sign in

###### &nbsp; &nbsp; POST _`/auth/sign-in`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "email": "johndoe@gmail.com",
  "password": "123456789"
}
```

##### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description       |          Properties          |
| :---------: | :---------------------: | :--------------------------: |
|   **200**   |           OK            |      `data: { token }`       |
|   **400**   |     Invalid Syntax      | `error: { message, detail }` |
|   **404**   |     User not Found      | `error: { message, detail }` |
|   **409**   | User has active Session | `error: { message, detail }` |
|   **422**   |  Invalid Request Input  | `error: { message, detail }` |
|   **500**   |  Internal Server Error  | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Sign out

###### &nbsp; &nbsp; POST _`/auth/sign-out`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **404**   |   Session not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Users

### &nbsp; ‣ &nbsp; Create an User

###### &nbsp; &nbsp; POST _`/users/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "John Doe Junior the Third",
  "email": "johndoe@gmail.com",
  "password": "123456789"
}
```

##### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description        |          Properties          |
| :---------: | :----------------------: | :--------------------------: |
|   **201**   |         Created          |         `data: null`         |
|   **400**   |      Invalid Syntax      | `error: { message, detail }` |
|   **409**   | Email Already Registered | `error: { message, detail }` |
|   **422**   |  Invalid Request Input   | `error: { message, detail }` |
|   **500**   |  Internal Server Error   | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Users

###### &nbsp; &nbsp; GET _`/users/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |    10     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |  `data: { User[] \| null}`   |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search User by id

###### &nbsp; &nbsp; GET _`/users/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: User`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |


### &nbsp; ‣ &nbsp; Delete an User

###### &nbsp; &nbsp; DELETE _`/users/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    User not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Cooks

### &nbsp; ‣ &nbsp; Create a Cook

###### &nbsp; &nbsp; POST _`/cooks/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "cir": "9999999",
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description       |          Properties          |
| :---------: | :--------------------: | :--------------------------: |
|   **201**   |        Created         |         `data: null`         |
|   **400**   |     Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token      | `error: { message, detail }` |
|   **403**   |    Forbidden Token     | `error: { message, detail }` |
|   **409**   | CIR Already Registered | `error: { message, detail }` |
|   **422**   | Invalid Request Input  | `error: { message, detail }` |
|   **500**   | Internal Server Error  | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Cooks

###### &nbsp; &nbsp; GET _`/cooks/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |     5     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |  `data: { Cook[] \| null}`   |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Cook not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search Cook by id

###### &nbsp; &nbsp; GET _`/cooks/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: Cook`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Cook not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |


### &nbsp; ‣ &nbsp; Delete a Cook

###### &nbsp; &nbsp; DELETE _`/cooks/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |    Cook not Found     | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

## Suppliers

### &nbsp; ‣ &nbsp; Create a Supplier

###### &nbsp; &nbsp; POST _`/suppliers/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "name": "Semantix",
  "cnpj": "44681667000172",
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |       Description       |          Properties          |
| :---------: | :---------------------: | :--------------------------: |
|   **201**   |         Created         |         `data: null`         |
|   **400**   |     Invalid Syntax      | `error: { message, detail }` |
|   **401**   |      Missing Token      | `error: { message, detail }` |
|   **403**   |     Forbidden Token     | `error: { message, detail }` |
|   **409**   | CNPJ Already Registered | `error: { message, detail }` |
|   **422**   |  Invalid Request Input  | `error: { message, detail }` |
|   **500**   |  Internal Server Error  | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Suppliers

###### &nbsp; &nbsp; GET _`/suppliers/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |     5     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           | `data: { Supplier[] \| null}` |
|   **400**   |    Invalid Syntax     | `error: { message, detail }`  |
|   **401**   |     Missing Token     | `error: { message, detail }`  |
|   **403**   |    Forbidden Token    | `error: { message, detail }`  |
|   **404**   |  Supplier not Found   | `error: { message, detail }`  |
|   **422**   | Invalid Request Input | `error: { message, detail }`  |
|   **500**   | Internal Server Error | `error: { message, detail }`  |

### &nbsp; ‣ &nbsp; Search Supplier by id

###### &nbsp; &nbsp; GET _`/suppliers/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |       `data: Supplier`       |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |  Supplier not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |


### &nbsp; ‣ &nbsp; Delete a Supplier

###### &nbsp; &nbsp; DELETE _`/suppliers/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |  Supplier not Found   | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |


## Provisions

### &nbsp; ‣ &nbsp; Create a Provision

###### &nbsp; &nbsp; POST _`/provisions/create`_

#### &nbsp; ☰ &nbsp; Request

##### Body

```json
{
  "type": "Macarrão",
}
```

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **201**   |        Created        |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

### &nbsp; ‣ &nbsp; Search all Provisions

###### &nbsp; &nbsp; GET _`/provisions/all`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

##### Query Parameters

|   Name   |   Type   |               Description                | `Default` |
| :------: | :------: | :--------------------------------------: | :-------: |
| per_page | `Number` | The number of results per page (max 100) |    10     |
|   page   | `Number` |   Page number of the results to fetch    |     1     |
|  owner   | `String` |  Username of the owner of the provision  |     -     |
|  status  | `String` |         Status of the provision          |     -     |
|  model   | `String` |          Model of the provision          |     -     |

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |           Properties           |
| :---------: | :-------------------: | :----------------------------: |
|   **200**   |          OK           | `data: { Provision[] \| null}` |
|   **400**   |    Invalid Syntax     |  `error: { message, detail }`  |
|   **401**   |     Missing Token     |  `error: { message, detail }`  |
|   **403**   |    Forbidden Token    |  `error: { message, detail }`  |
|   **404**   |  Provision not Found  |  `error: { message, detail }`  |
|   **422**   | Invalid Request Input |  `error: { message, detail }`  |
|   **500**   | Internal Server Error |  `error: { message, detail }`  |

### &nbsp; ‣ &nbsp; Search Provision by id

###### &nbsp; &nbsp; GET _`/provisions/:id`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |      `data: Provision`       |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |  Provision not Found  | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |


### &nbsp; ‣ &nbsp; Delete a Provision

###### &nbsp; &nbsp; DELETE _`/provisions/:id/delete`_

#### &nbsp; ☰ &nbsp; Request

##### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

#### &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties          |
| :---------: | :-------------------: | :--------------------------: |
|   **200**   |          OK           |         `data: null`         |
|   **400**   |    Invalid Syntax     | `error: { message, detail }` |
|   **401**   |     Missing Token     | `error: { message, detail }` |
|   **403**   |    Forbidden Token    | `error: { message, detail }` |
|   **404**   |  Provision not Found  | `error: { message, detail }` |
|   **422**   | Invalid Request Input | `error: { message, detail }` |
|   **500**   | Internal Server Error | `error: { message, detail }` |

#
