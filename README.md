# Music Player - Spotify Clone

## Description:
This repository contains the source code for a Music Player that utilizes the Spotify API. This app is built with React/TypeScript for front-end development and NodeJS/Express for server-side development. Simple component tests were made to practice test-driven-development.

## Built With
* React
* TypeScript
* NodeJS
* Express
* React Redux
* Redux Persist
* Styled Components
* React Icons
* ESLint
* Prettier
* Axios
* Morgan
* THREE
* React-Three Fiber
* React-Three Drei
* React-Three PostProcessing

## Project Requirements
- Visual Studio Code
- Visual Studio Code Installer Projects (https://code.visualstudio.com/download)

## Project Setup
- [Git](https://git-scm.com/) must be installed
- Clone repository `git clone git@github.com:srirachy/capstone_music_player.git`
- Install dependencies in root, client, and server running:

```bash
npm install
```

```bash
cd client
npm install
```

```bash
cd server
npm install
```

## Running the Project
- Start both client and server with the following command:

```bash
npm run dev
```

## Development Process
- Gitflow Workflow
  - When starting work on a new feature, create a new `feature branch`

    ```bash
    git flow feature start feature_branch
    ```

  - Once finished, the branch will merge into `develop`

    ```bash
    git flow feature finish feature_branch
    ```

  - When starting work on a new release version, create a `release branch` and increment the `minor` version 

    ```bash
    git flow release start 0.1.0
    ```

## Deployment Process
- Coming Soon™

## Wiki
For information on Installation and API, see the [wiki](https://github.com/srirachy/capstone_music_player/wiki/Installation-and-API)
