import * as React from 'react';

import { ExpoWalletCoreViewProps } from './ExpoWalletCore.types';

export default function ExpoWalletCoreView(props: ExpoWalletCoreViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
