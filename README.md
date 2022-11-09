<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/customer-management/tree/main/server">
    <img src="assets/logo.png" alt="Logo" width="100">
  </a>

  <h3 align="center">Customer Management System</h3>
  <div align="center">
    <h6>WIP</h6>
    Full Stack Software Development PoC 
    <br />
    <a href="https://github.com/NivaldoFarias/customer-management/tree/main/server"><strong>Browse Back End code»</strong></a>
    -
    <a href="https://github.com/NivaldoFarias/customer-management/tree/main/client"><strong>Browse Front End code»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  

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
          - [Pre-requisites](#pre-requisites-nodejs-18120-git-2330)
- [Client and Server](#client-and-server)
- [Running inside Docker](#running-inside-docker)
          - [Pre-requisites](#pre-requisites-docker-201017-docker-compose-1292)
    - [Stopping the containers](#stopping-the-containers)
    - [Clean Up](#clean-up)
    - [Run Server Only](#run-server-only)

# Installation and Usage

###### Pre-requisites: Node.js `^18.12.0`, Git `^2.33.0`

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

<!-- Client and Server -->

# Client and Server

The client and server are separated into two different folders, each containing their own Documentation and usage descriptions.

- [Client](https://github.com/NivaldoFarias/customer-management/tree/main/client) `Next.js` `TypeScript` `React` `SASS`
- [Server](https://github.com/NivaldoFarias/customer-management/tree/main/server) `Node.js` `TypeScript` `Express` `MongoDB` `Mongoose` `JWT`

# Running inside Docker
###### Pre-requisites: Docker `^20.10.17`, Docker Compose `^1.29.2`

With the pre-requisites installed and the repository cloned or downloaded _(see [Installation and Usage](https://github.com/NivaldoFarias/customer-management#installation-and-usage))_, populate your local `.env` or `.env.dev` file with the variables specified in the `.env.example` file.

Then run the following command to start the containers:

```bash
# Running in production mode
npm run docker:up

# Running in development mode
npm run docker:up:dev
```

The development containers will run in the background, during which the following services will be available through the respective ports in your machine:

- **Production**
  - `80` - Client
  - `5000` - Server
  - `27017`- Database
- **Development**
  - `8080` - Client
  - `5050` - Server
  - `27027`- Database

### Stopping the containers

- Stop containers created by _docker-compose_: `npm run docker:down` or `npm run docker:down:dev`
- Stop the _Client_ container: `docker stop cms-client_dev`
- Stop the _Server_ container: `docker stop cms-server_dev`

### Clean Up

- Prune Dangling Images: `docker image prune`
- Prune Dangling and unused Images: `docker volume prune -a`

### Run Server Only

To run a lone Server Container, follow the steps described at [Server](https://github.com/NivaldoFarias/customer-management/tree/main/server#docker-container).

#
