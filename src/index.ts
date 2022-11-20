import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoWalletCore.web.ts
// and on native platforms to ExpoWalletCore.ts
import ExpoWalletCoreModule from './ExpoWalletCoreModule';
import ExpoWalletCoreView from './ExpoWalletCoreView';
import { ChangeEventPayload, ExpoWalletCoreViewProps } from './ExpoWalletCore.types';

// Get the native constant value.
export const PI = ExpoWalletCoreModule.PI;

export function hello(): string {
  return ExpoWalletCoreModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoWalletCoreModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoWalletCoreModule ?? NativeModulesProxy.ExpoWalletCore);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoWalletCoreView, ExpoWalletCoreViewProps, ChangeEventPayload };
