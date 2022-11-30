import ExpoModulesCore
import WalletCore
import UIKit
import SwiftProtobuf

public class ExpoWalletCoreModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoWalletCore")

    Function("create") { () -> [String : String] in
      let wallet = HDWallet(strength: 128, passphrase: "")!
      return [
        "entropy": wallet.entropy.hexString,
        "mnemonic": wallet.mnemonic,
        "seed": wallet.seed.hexString
      ]
    }

    Function("createWithMnemonic") { (mnemonic: String) -> [String : String] in
      let wallet = HDWallet(mnemonic: mnemonic, passphrase: "")!
      return [
        "entropy": wallet.entropy.hexString,
        "mnemonic": wallet.mnemonic,
        "seed": wallet.seed.hexString
      ]
    }

    Function("getAddressForCoin") { (mnemonic: String, coin: UInt32) -> String in
      let wallet = HDWallet(mnemonic: mnemonic, passphrase: "")!
      let coin = CoinType(rawValue: coin)!
      return wallet.getAddressForCoin(coin: coin)
    }

    Function("getKeyForCoin") { (mnemonic: String, coin: UInt32) -> String in
      let wallet = HDWallet(mnemonic: mnemonic, passphrase: "")!
      let coin = CoinType(rawValue: coin)!
      return wallet.getKeyForCoin(coin: coin).data.hexString
    }

    Function("sign") { (data: String, coin: UInt32) -> String in
        let coin = CoinType(rawValue: coin)!
        let signerOutput = AnySigner.nativeSign(data: Data(hexString: data)!, coin: coin)
        return signerOutput.hexString
    }
  }
}
