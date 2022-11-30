import { requireNativeModule } from "expo-modules-core";

import { CoinType } from "./ExpoWalletCore.types";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const ExpoWalletCoreModule = requireNativeModule("ExpoWalletCore");

// eslint-disable-next-line prettier/prettier
export const create = (): { entropy: string, mnemonic: string, seed: string } => {
  return ExpoWalletCoreModule.create();
};

// eslint-disable-next-line prettier/prettier
export const createWithMnemonic = (mnemonic: string): { entropy: string, mnemonic: string, seed: string } => {
  return ExpoWalletCoreModule.createWithMnemonic(mnemonic);
};

export const getAddressForCoin = (mnemonic: string, coin: CoinType): string => {
  return ExpoWalletCoreModule.getAddressForCoin(mnemonic, coin);
};

export const getKeyForCoin = (mnemonic: string, coin: CoinType): string => {
  return ExpoWalletCoreModule.getKeyForCoin(mnemonic, coin);
};

export const sign = (data: string, coin: CoinType): string => {
  return ExpoWalletCoreModule.sign(data, coin);
};

export default ExpoWalletCoreModule;
