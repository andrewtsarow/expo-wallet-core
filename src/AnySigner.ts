import { CoinType } from "./ExpoWalletCore.types";
import { sign } from "./ExpoWalletCoreModule";

class AnySigner {
  static async build() {
    return new AnySigner();
  }

  public async sign(data: string, coin: CoinType): Promise<string> {
    return sign(data, coin);
  }
}

export default AnySigner;
