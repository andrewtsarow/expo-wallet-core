import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWalletCoreViewProps } from './ExpoWalletCore.types';

const NativeView: React.ComponentType<ExpoWalletCoreViewProps> =
  requireNativeViewManager('ExpoWalletCore');

export default function ExpoWalletCoreView(props: ExpoWalletCoreViewProps) {
  return <NativeView {...props} />;
}
