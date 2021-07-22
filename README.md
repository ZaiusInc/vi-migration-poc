# VI Migration POC App

## Getting Started

Zaius Apps run on node 12 and are packaged using [yarn](https://yarnpkg.com/lang/en/).

Ensure node and [yarn](https://yarnpkg.com/lang/en/) are installed,
then run `yarn` to install dependencies.

Apps should be written in [TypeScript](https://www.typescriptlang.org/).
[Visual Studio Code](https://code.visualstudio.com/) is a great free IDE for typescript projects.

Finally, check out the [documentation](https://app.gitbook.com/@zaius/s/build-apps/)

## Build and test

You can use any test framework you like, but Jest comes pre-installed with a Zaius app.
To run your unit tests, just run:
```
yarn test
```

Before you upload an app to Zaius, you can validate your app package to ensure it's ready for upload.
```
yarn validate
```

## Zaius CLI

After customizing your app, use the Zaius CLI to register, upload, and publish your app.
