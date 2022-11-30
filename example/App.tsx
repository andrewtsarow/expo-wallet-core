import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WalletAddressesScreen from "./screens/WalletAddressesScreen";
import WalletsListScreen from "./screens/WalletsListScreen";

export type RootStackParamList = {
  WalletsList: undefined;
  WalletAddresses: {
    mnemonic: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="WalletsList">
        <RootStack.Screen
          component={WalletsListScreen}
          name="WalletsList"
          options={{}}
        />
        <RootStack.Screen
          component={WalletAddressesScreen}
          name="WalletAddresses"
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
