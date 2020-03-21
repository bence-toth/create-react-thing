# Create React Thing

Create rich boilerplate for React libraries with ease.


## Quick start

Get started by running:

```sh
npx create-react-thing
```

This will ask you a few questions and then set up your React library boilerplate in a subfolder matching the npm package name you specify.

You can optionally specify the npm package name as a command line argument when running Create React Thing:

```sh
npx create-react-thing my-thing
```

Or for a scoped package:

```sh
npx create-react-thing @my-scope/my-thing
```


## What can I use it for?

Create React Thing’s boilerplate is meant for React libraries you would typically publish to [the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry), for example:
- a single React component
- a React component library
- a single React custom hook
- a React custom hooks library


## What’s included?

Your environment will have many tools to help you build modern React libraries:

- [React](https://reactjs.org/), [ES.next](https://babeljs.io/docs/en/babel-preset-env) and [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax support with [Babel](https://babeljs.io/)

- handy React utilities like [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) and [Classnames](https://github.com/JedWatson/classnames#readme)

- [Storybook](https://storybook.js.org/), with various add-ons installed and structural snapshot testing capabilities configured

- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for running unit and integration tests, generating test coverage reports, and a beautiful browser-based UI for your test runner via [Majestic](https://github.com/Raathigesh/majestic#readme)

- [ESLint](https://eslint.org/) and [StyleLint](https://stylelint.io/) configured for code consistency and many good practices

- [Alex](https://github.com/get-alex/alex#readme) to catch insensitive, inconsiderate writing in your documentation

- a build script based on [Webpack](https://webpack.js.org/) to prepare your library to be published to [the npm registry](https://www.npmjs.com/)

- hassle-free interactive updates for dependencies via [npm-check](https://github.com/dylang/npm-check#readme)


## Contributing

If something doesn’t work, please [file an issue](https://github.com/bence-toth/create-react-thing/issues).

If you have questions, need help, or would like to contribute, please reach out at [tothab@gmail.com](mailto:tothab@gmail.com).


## License

Create React Thing is [licensed under MIT](./LICENSE).
