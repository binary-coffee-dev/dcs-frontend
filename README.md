# Binary Coffee frontend application

|branch|`master`|`develop`|
|---|---|---|
|build|[![Build Status](https://travis-ci.com/dcs-community/dcs-frontend.svg?branch=master)](https://travis-ci.com/dcs-community/dcs-frontend)|[![Build Status](https://travis-ci.com/dcs-community/dcs-frontend.svg?branch=master)](https://travis-ci.com/dcs-community/dcs-frontend)|
|coverage|[![master](https://codecov.io/gh/dcs-community/dcs-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/dcs-community/dcs-frontend)|[![develop](https://codecov.io/gh/dcs-community/dcs-frontend/branch/develop/graph/badge.svg)](https://codecov.io/gh/dcs-community/dcs-frontend)|

In this repository you can find the two application that define the whole frontend in Binary Coffee website.
First you have the user dashboard with all the behaviors relates to administrate the user information and his own articles.
And second you have the core frontend of the website, with everything related to the published articles.

## Start application

### Core frontend

**Development**

```
npm start
```

**Production**

```
npm run serve:ssr
```

> NOTE: First need the build action

### Dashboard frontend

```
npm run start:admin
```

## Start application with docker

### Core frontend

```
docker-compose up -d
```

### Dashboard frontend

```
docker-compose -f docker-compose.admin.yml up -d
```

## Build

### Core frontend

**Build in development**

```
npm run build:ssr:dev
```

**Build in production**

```
npm run build:ssr
```

### Dashboard frontend

**Build in development**

```
npm run build:admin
```

**Build in production**

```
npm run build:admin:prod
```

## Running unit tests

```
npm test
```

## Code generation

**Generate component**

```
$ ng g c component-name
```

NOTE: be sure to be in the folder where you want to create the new component

**Generate library**

```
$ ng g @nrwl/angular:lib library-name
```

**Generate ngxs state**

```
$ ng g @ngxs/schematics:store --name state-name
```

## Contributing

Any contribution is welcome, but please first read the CONTRIBUTING guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

And remember that you can invite us to a coffee:

[![](https://cdn.buymeacoffee.com/buttons/arial-green.png)](https://www.buymeacoffee.com/binarycoffee)

## License

The license of this application can be found here [LICENSE.md](./LICENSE.md)
