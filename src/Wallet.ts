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

  constructor(entropy: string, mnemonic: string, seed: string) {
    this.entropy = entropy;
    this.mnemonic = mnemonic;
    this.seed = seed;
  }

  static async build(mnemonic?: string) {
    const wallet = mnemonic
      ? await createWithMnemonic(mnemonic)
      : await create();
    return new Wallet(wallet.entropy, wallet.mnemonic, wallet.seed);
  }

  public async getAddressForCoin(coin: CoinType): Promise<string> {
    return getAddressForCoin(this.mnemonic, coin);
  }

  public async getKeyForCoin(coin: CoinType): Promise<string> {
    return getKeyForCoin(this.mnemonic, coin);
  }
}

export default Wallet;
