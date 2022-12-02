import { requireNativeModule } from "expo-modules-core";

import { CoinType } from "./ExpoWalletCore.types";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const ExpoWalletCoreModule = requireNativeModule("ExpoWalletCore");

export const create = async (): Promise<{
  entropy: string;
  mnemonic: string;
  seed: string;
}> => {
  return ExpoWalletCoreModule.create();
};

export const createWithMnemonic = async (
  mnemonic: string
): Promise<{ entropy: string; mnemonic: string; seed: string }> => {
  return ExpoWalletCoreModule.createWithMnemonic(mnemonic);
};

export const getAddressForCoin = async (
  mnemonic: string,
  coin: CoinType
): Promise<string> => {
  return ExpoWalletCoreModule.getAddressForCoin(mnemonic, coin);
};

export const getKeyForCoin = async (
  mnemonic: string,
  coin: CoinType
): Promise<string> => {
  return ExpoWalletCoreModule.getKeyForCoin(mnemonic, coin);
};

export const sign = async (data: string, coin: CoinType): Promise<string> => {
  return ExpoWalletCoreModule.sign(data, coin);
};

export default ExpoWalletCoreModule;
