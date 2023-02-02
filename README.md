# TypeScript Web Starter

An open source web server written in TypeScript

## Features

- **TypeScript**: Transpiles app to javascript using `babel`. Type checking
  perfomed using `tsc`
- **Coding Standards**: Linting and Formatting using `eslint` and `prettier`.
  Husky `pre-commit` hook validates standards.
- **MongoDB**: Example data models with passing test suite to get started
- **Mongo-Memory-Server**: Test suite uses mongo-memory-server
- **Sample Data**: yarn script to seed sample app data `yarn db:seed`

## Getting Started

### Prereqs

- node 16
- yarn@latest

With a fresh copy of this repo on your local:

```
cp .env.sample .env
yarn install
yarn db:seed
yarn dev
```

### Available Scripts

`test` - Runs unit tests<br/> `lint` - Runs ESLint<br/> `format` - Checks
formatting using Prettier<br/> `format:fix` - Fixes formatting using
Prettier</br> `check-types` - Checks Types using tsc</br> `validate` - Checks
health of source code by running all of the above.<br/> `build` - Transpiles our
app into JavaScript in the `/dist` folder<br/> `dev` - Runs our application in
`development` mode<br/> `start` - Runs the application in `production` mode<br/>
