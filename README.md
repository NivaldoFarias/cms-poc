<!-- Project Summary -->

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/content-management-system/tree/main/server">
    <img src="assets/logo.png" alt="Logo" width="100">
  </a>

  <h3 align="center">Content Management System</h3>
  <div align="center">
    <h6>WIP</h6>
    Content Management System PoC & Full Stack Software Engineering Playground 
    <br />
    <a href="https://github.com/NivaldoFarias/content-management-system/tree/main/apps/server"><strong>Browse Back End code»</strong></a>
    -
    <a href="https://github.com/NivaldoFarias/content-management-system/tree/main/apps/client"><strong>Browse Front End code»</strong></a>
  </div>
</div>

<div align="center">
  <h3>Built and Managed With</h3>

  <img src="https://img.shields.io/badge/Docker-0096FF?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Turborepo-151225?style=for-the-badge&logo=turborepo&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/commitlint-black?style=for-the-badge&logo=commitlint&logoColor=0096FF&logoWidth=30" height="30px"/>
  <img src="https://img.shields.io/badge/Stylelint-black?style=for-the-badge&logo=stylelint&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br />

<div align="center">
  <a href="https://github.com/NivaldoFarias/content-management-system" alt="MIT license badge">
    <img src="https://img.shields.io/badge/license-MIT-%23A8D1FF?style=flat-square" />
  </a>
</div>

<!-- Table of Contents -->

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation and Usage](#installation-and-usage) - [Pre-requisites](#pre-requisites-nodejs-18120-git-2330)
- [Client and Server](#client-and-server)
- [Running inside Docker](#running-inside-docker) - [Pre-requisites](#pre-requisites-docker-201017-docker-compose-1292)
  - [Stopping the containers](#stopping-the-containers)
  - [Clean Up](#clean-up)
  - [Run Server Only](#run-server-only)

# Installation and Usage

###### Pre-requisites: Node.js `^18.12.0`, Git `^2.33.0`, MongoDB `^5.0.11`

Download the zip file and extract it in the root of a new project folder by running these commands:

```bash
wget https://github.com/NivaldoFarias/content-management-system/archive/main.zip
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

# Running inside Docker using Makefile

###### Pre-requisites: Docker `^20.10.17`, Docker Compose `^2.12.2`

With the pre-requisites installed and the repository cloned or downloaded _(see [Installation and Usage](https://github.com/NivaldoFarias/customer-management-system#installation-and-usage))_, populate your local `.env.dev` file with the variables specified in the `.env.example` file _(as well as a `.env` for Next.js to run properly)_.

Then run the following command to start the containers:

```bash
make start-development
```

If a new build is required, run the following command:

```bash
make build-development
```

To stop the containers, run the following command:

```bash
make stop-development
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

## Clean Up

- Prune Dangling Images: `docker image prune`
- Prune Dangling and unused Images: `docker volume prune -a`
- Prune system: `docker system prune -a` _(add the `--volumes` flag to erase stored volumes)_

## Run Server Only

To run the server (and database) only, you can use the following command:

```bash
make start-server
```

If a new build is required, run the following command:

```bash
make build-server
```

To stop the containers, run the following command:

```bash
make stop-server
```

#
