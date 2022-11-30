import { CoinType } from "./ExpoWalletCore.types";
import {
  create,
  createWithMnemonic,
  getAddressForCoin,
  getKeyForCoin,
} from "./ExpoWalletCoreModule";

class Wallet {
  public entropy: string;
  public mnemonic: string;
  public seed: string;

  constructor(mnemonic?: string) {
    const wallet = mnemonic ? createWithMnemonic(mnemonic) : create();
    this.entropy = wallet.entropy;
    this.mnemonic = wallet.mnemonic;
    this.seed = wallet.seed;
  }

  public getAddressForCoin(coin: CoinType): string {
    return getAddressForCoin(this.mnemonic, coin);
  }

  public getKeyForCoin(coin: CoinType): string {
    return getKeyForCoin(this.mnemonic, coin);
  }
}

export default Wallet;
