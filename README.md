# TypeScript Web Boilerplate
An open source TypeScript project boilerplate

## Getting Started

### Prereqs
- node 16
- yarn@latest

With a fresh copy of this repo on your local:

```
yarn install
yarn dev
```

### Available Scripts

`lint` - Runs ESLint<br/>
`format` - Checks formatting using Prettier<br/>
`format:fix` - Fixes formatting using Prettier</br>
`check-types` - Checks Types using tsc</br>
`validate` - Checks health of source code by running all of the above. Also runs as a pre-commit git hook using Husky.<br/>
`build` - Transpiles our app into JavaScript in the `/dist` folder<br/>
`dev` - Runs our application in `development` mode<br/>
`start` - Runs the application in `production` mode<br/>