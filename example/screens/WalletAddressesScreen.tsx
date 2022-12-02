import { RouteProp, useRoute } from "@react-navigation/native";
import * as WalletCore from "expo-wallet-core";
import { useEffect, useState } from "react";
import {
  Alert,
  Clipboard,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../App";

const { CoinType, Wallet } = WalletCore;

function WalletAddressesScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "WalletAddresses">>();
  const [addresses, setAddresses] = useState<
    { address: string; chain: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const wallet = await Wallet.build(route.params.mnemonic);
      const addresses = await Promise.all(
        (Object.keys(CoinType) as (keyof typeof CoinType)[])
          .filter((key) => Number.isNaN(Number(key)))
          .map(async (key) => ({
            address: await wallet.getAddressForCoin(CoinType[key]),
            chain: key,
          }))
      );
      setAddresses(addresses);
    })();
  }, []);

  const copy = (address: string) => {
    Alert.alert("Copied to clipboard", address);
    Clipboard.setString(address);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.chain}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => copy(item.address)}>
            <View style={styles.addressContainer}>
              <Text style={styles.chainLabel}>{item.chain}</Text>
              <Text style={styles.addressLabel}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 8,
  },
  addressLabel: {},
  chainLabel: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
});

export default WalletAddressesScreen;
