# Build

[<< go back to documentation](./doc.md)

Here you can find the steps you need to follow to build the project and let it ready for deployment, or just to test it if it works in you local environment.

## Blog

```
// development
nx run blog:build:development && nx run blog:server:development

// production
nx run blog:build:production && nx run blog:server:production
```

## Dashboard

```
// development
nx run dashboard:build:development

// production
nx run dashboard:build:production
```
