# 21Epub UI

## Getting Started

```sh
corepack enable
yarn run bootstrap
```

## Usage

### Create a new package

```sh
yarn run create <package>
```

### Lint a package

```sh
yarn packages/<package> run lint
```

### Build a package

```sh
yarn packages/<package> run build
```

### Watch a package

```sh
yarn packages/<package> run build --watch
```

### Release a package

```sh
yarn packages/<package> run version <strategy>
git push --follow-tags
```
