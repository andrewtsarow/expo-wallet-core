# expo-wallet-core

Provides access to cross-platform, cross-blockchain wallet library. This module wraps [trustwallet/wallet-core](https://github.com/trustwallet/wallet-core).

# API documentation

- [Documentation for the Trust Wallet Core](https://developer.trustwallet.com/wallet-core)
- [Usage](#usage)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-wallet-core
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.

### Configure for Android

# Usage

## Create a new wallet

```typescript
import * as WalletCore from "expo-wallet-core";

const wallet = new WalletCore.Wallet();

console.log(wallet.mnemonic);
```

## Create an existing wallet

```typescript
import * as WalletCore from "expo-wallet-core";

const wallet = new WalletCore.Wallet(
  "ripple scissors kick mammal hire column oak again sun offer wealth tomorrow wagon turn fatal",
);

console.log(wallet.mnemonic);
```

## Get coin address

```typescript
import * as WalletCore from "expo-wallet-core";

const wallet = new WalletCore.Wallet(
  "ripple scissors kick mammal hire column oak again sun offer wealth tomorrow wagon turn fatal",
);
const ethereumAddress = wallet.getAddressForCoin(WalletCore.CoinType.Ethereum);

console.log(ethereumAddress);
```

## Get coin key

```typescript
import * as WalletCore from "expo-wallet-core";

const wallet = new WalletCore.Wallet(
  "ripple scissors kick mammal hire column oak again sun offer wealth tomorrow wagon turn fatal",
);
const ethereumKey = wallet.getKeyForCoin(WalletCore.CoinType.Ethereum);

console.log(ethereumKey);
```

## Sign transaction

```typescript
import * as WalletCore from "expo-wallet-core";

const wallet = new WalletCore.Wallet(
  "ripple scissors kick mammal hire column oak again sun offer wealth tomorrow wagon turn fatal",
);
const signingInput = WalletCore.TW.Ethereum.Proto.SigningInput.encode({
  chainId: WalletCore.Utils.dec2buf(1),
  gasLimit: WalletCore.Utils.dec2buf(21000),
  gasPrice: WalletCore.Utils.dec2buf(3600000000),
  toAddress: "0xC37054b3b48C3317082E7ba872d7753D13da4986",
  privateKey: WalletCore.Utils.hex2buf(
    wallet.getKeyForCoin(WalletCore.CoinType.Ethereum),
  ),
  transaction: WalletCore.TW.Ethereum.Proto.Transaction.create({
    transfer: WalletCore.TW.Ethereum.Proto.Transaction.Transfer.create({
      amount: WalletCore.Utils.dec2buf(924400000000000),
    }),
  }),
});
const signingOutputRaw = new WalletCore.AnySigner().sign(
  WalletCore.Utils.buf2hex(signingInput.finish()),
  WalletCore.CoinType.Ethereum,
);
const signingOutputEncoded =
  WalletCore.TW.Ethereum.Proto.SigningOutput.decode(
    WalletCore.Utils.hex2buf(signingOutputRaw),
  );
const transaction = WalletCore.Utils.buf2hex(signingOutputEncoded.encoded);

console.log(transaction);
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
