import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as WalletCore from "expo-wallet-core";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../App";

const { Wallet } = WalletCore;

const testMnemonic =
  "badge swift slam upgrade wing junk soap wish scrub please also proud";

function WalletsListScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mnemonics, setMnemonics] = useState([testMnemonic]);

  const clear = () => {
    setMnemonics([testMnemonic]);
  };

  const create = async () => {
    const wallet = await Wallet.build();
    setMnemonics([...mnemonics, wallet.mnemonic!]);
  };

  const createWithMnemonic = () => {
    Alert.prompt("Paste existing mnemonic", "", (mnemonic) => {
      setMnemonics([...mnemonics, mnemonic]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={mnemonics}
          keyExtractor={(item) => item}
          renderItem={({ index, item: mnemonic }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("WalletAddresses", { mnemonic })
              }
            >
              <View style={styles.mnemonicContainer}>
                <Text style={styles.indexLabel}>#{index}</Text>
                <Text style={styles.mnemonicLabel}>{mnemonic}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.buttonsContainer}>
          <Button onPress={clear} title="Clear" />
          <Button onPress={create} title="Create" />
          <Button onPress={createWithMnemonic} title="Create with mnemonic" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  indexLabel: {
    fontWeight: "bold",
  },
  mnemonicContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 8,
  },
  mnemonicLabel: {},
  title: {
    fontSize: 24,
    padding: 8,
  },
});

export default WalletsListScreen;
