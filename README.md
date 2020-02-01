# DcsFrontend

[![Build Status](https://travis-ci.com/dcs-community/dcs-frontend.svg?branch=master)](https://travis-ci.com/dcs-community/dcs-frontend)
![codecov.io](https://img.shields.io/codecov/c/github/dcs-community/dcs-frontend/master.svg?style=flat-square)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

**Expose environment variables**

All the environment variables of the project can be found in the `src/environments/environments.ts` file. If you want to change the value of some of these environments variables, you only need to have the environment in the system. In order to be possible to recognize the variable you need to put at the beginning the `NG_` prefix, so if the variable name is `apiUrl` you need to **export** the environment variable `NG_API_URL` and this will be automatically inserted in the `base.ts` file at the same level of the `environment.ts` file.

**Environment variables**

- `NG_API_URL`: api url. By default: `http://localhost:1337/`
- `NG_PRODUCTION`: define if the application is running in production or not. By default: `false`

**Build the project**

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Contributing

Any contribution is welcome, but please first read the CONTRIBUTING guide: [CONTRIBUTING.md](https://github.com/dcs-community/dcs-frontend/blob/master/CONTRIBUTING.md)
