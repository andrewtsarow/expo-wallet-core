package expo.modules.walletcore

import com.google.protobuf.ByteString
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import wallet.core.java.AnySigner
import wallet.core.jni.CoinType
import wallet.core.jni.HDWallet
import wallet.core.jni.proto.Ethereum
import java.math.BigInteger

fun ByteArray.toHexString() : String {
  return this.joinToString("") {
    java.lang.String.format("%02x", it)
  }
}

class ExpoWalletCoreModule : Module() {
  init {
    System.loadLibrary("TrustWalletCore")
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoWalletCore")

    Function("create") {
      val wallet = HDWallet(128, "")
      mapOf(
        "entropy" to wallet.entropy().toString(),
        "mnemonic" to wallet.mnemonic(),
        "seed" to wallet.seed().toString()
      )
    }

    Function("createWithMnemonic") { mnemonic: String ->
      val wallet = HDWallet(mnemonic, "")
      mapOf(
        "entropy" to wallet.entropy().toString(),
        "mnemonic" to wallet.mnemonic(),
        "seed" to wallet.seed().toString()
      )
    }

    Function("getAddressForCoin") { mnemonic: String, coin: Int ->
      val wallet = HDWallet(mnemonic, "")
      wallet.getAddressForCoin(CoinType.createFromValue(coin))
    }

    Function("getKeyForCoin") { mnemonic: String, coin: Int ->
      val wallet = HDWallet(mnemonic, "")
      wallet.getKeyForCoin(CoinType.createFromValue(coin)).data().toHexString()
    }

    Function("sign") { data: String, coin: Int ->
      val output = AnySigner.nativeSign(BigInteger(data, 16).toByteArray(), coin)
      output.toHexString()
    }
  }
}
