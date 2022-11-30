import { CoinType } from "./ExpoWalletCore.types";
import { sign } from "./ExpoWalletCoreModule";

class AnySigner {
  public sign(data: string, coin: CoinType): string {
    return sign(data, coin);
  }
}

export default AnySigner;
