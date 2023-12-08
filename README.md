# Javascript SDK

Javascript SDK for interacting with the Kriptonio Platform.

Supports browser, server and react-native.

## Installation

```bash
npm install @kriptonio/sdk
```

## Usage

```typescript
import { KriptonioClient } from '@kriptonio/sdk';
const kriptonio = new KriptonioClient('<access-token>');

const signer = await kriptonio.wallet.signer({
    chainId: 80001, // mumbai in this case
    walletId: '<wallet-id>',
    walletPassword: '<wallet-password>',
});

const tx = await signer.sendTransaction({
    to: await signer.getAddress(),
    value: 0,
});

console.log('tx hash', tx.hash);
```

## Documentation

You can find the documentation here. [https://docs.kriptonio.com/sdk/javascript-sdk](https://docs.kriptonio.com/sdk/javascript-sdk)