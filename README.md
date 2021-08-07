# Remov

[![NPM version](https://img.shields.io/npm/v/namchee/remov)](https://www.npmjs.com/package/@namchee/remov) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/namchee/remov) [![Auto Release](https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACzElEQVR4AYXBW2iVBQAA4O+/nLlLO9NM7JSXasko2ASZMaKyhRKEDH2ohxHVWy6EiIiiLOgiZG9CtdgG0VNQoJEXRogVgZYylI1skiKVITPTTtnv3M7+v8UvnG3M+r7APLIRxStn69qzqeBBrMYyBDiL4SD0VeFmRwtrkrI5IjP0F7rjzrSjvbTqwubiLZffySrhRrSghBJa8EBYY0NyLJt8bDBOtzbEY72TldQ1kRm6otana8JK3/kzN/3V/NBPU6HsNnNlZAz/ukOalb0RBJKeQnykd7LiX5Fp/YXuQlfUuhXbg8Di5GL9jbXFq/tLa86PpxPhAPrwCYaiorS8L/uuPJh1hZFbcR8mewrx0d7JShr3F7pNW4vX0GRakKWVk7taDq7uPvFWw8YkMcPVb+vfvfRZ1i7zqFwjtmFouL72y6C/0L0Ie3GvaQXRyYVB3YZNE32/+A/D9bVLcRB3yw3hkRCdaDUtFl6Ykr20aaLvKoqIXUdbMj6GFzAmdxfWx9iIRrkDr1f27cFONGMUo/gRI/jNbIMYxJOoR1cY0OGaVPb5z9mlKbyJP/EsdmIXvsFmM7Ql42nEblX3xI1BbYbTkXCqRnxUbgzPo4T7sQBNeBG7zbAiDI8nWfZDhQWYCG4PFr+HMBQ6l5VPJybeRyJXwsdYJ/cRnlJV0yB4ZlUYtFQIkMZnst8fRrPcKezHCblz2IInMIkPzbbyb9mW42nWInc2xmE0y61AJ06oGsXL5rcOK1UdCbEXiVwNXsEy/6+EbaiVG8eeEAfxvaoSBnCH61uOD7BS1Ul8ESHBKWxCrdyd6EYNKihgEVrwOAbQruoytuBYIFfAc3gVN6iawhjKyNCEpYhVJXgbOzARyaU4hCtYizq5EI1YgiUoIlT1B7ZjByqmRWYbwtdYjoWoN7+LOIQefIqKawLzK6ID69GGpQgwhhEcwGGUzfEPAiPqsCXadFsAAAAASUVORK5CYII=)](https://github.com/namchee/remov)

Uninstall Node modules by regex patterns 📦

## Installation

You can install `remov` from your terminal using your favorite package manager. Below is them example of how to install `remov` with `npm`

```bash
npm install -g @namchee/remov
```

## Usage

You can execute `remov` from your terminal. Below is the example of using `remov` to uninstall `foo` and its related packages.

```bash
remov foo
```

## Options

### `<pattern>`

**Type**: `string`

Regex patterns for the packages that you want to uninstall. Support is limited to JS support.
For example, to uninstall all packages related with `rollup`, you can execute the following command from your terminal:

```bash
remov rollup
```

### `--dry, -d`

**Type**: `boolean`

Executes a dry-run. On dry-run mode, `remov` won't uninstall any packages and will just report the list of packages that matches the provided criteria.

### `--global, -g`

**Type**: `boolean`

Uninstall the package on global scope instead of the current working directory.

## FAQ

### What package managers are currently supported by `remov`?

Currently, `remov` supports `npm`, `yarn`, and `pnpm`
### Why are the uninstalled packages still exist on `node_modules`? I'm using `npm` by the way.

`npm` doesn't delete your uninstalled packages, even if the uninstall script completed successfully. You have to manually remove them with `npm prune`.

`yarn` and `pnpm` users won't encounter this issue at all.

## License

This project is licensed under the [MIT license](./LICENSE)
