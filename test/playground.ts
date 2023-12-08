import { KriptonioClient } from '../src';

async function main() {
  // const kriptonio = new KriptonioClient('org_VVIqWkTgqOW6uKYJStMM2ab95OijnTVh');

  // const smartContract = await kriptonio.smartContract.get(
  //   '5c933dab-f6c1-43e6-9e85-1be4a98d64c9'
  // );
  // const signer = await kriptonio.smartContract.signer({
  //   smartContractId: smartContract.id,
  //   walletPassword: 'testWallet123',
  // });

  // const contract = new ethers.Contract(
  //   smartContract.deployment!.address,
  //   smartContract.abi,
  //   signer
  // );

  // // const estimation = contract.getFunction('mint').estimateGas()
  // const response = await contract.mint(
  //   '0x13a11cec9970d58e1170e98d28d2812a23890341',
  //   1
  // );
  // console.log('contract name', response);

  // const kriptonio = new KriptonioClient('org_VVIqWkTgqOW6uKYJStMM2ab95OijnTVh');

  // const smartContract = await kriptonio.smartContract.get(
  //   '978b1e27-da53-4c70-a0a7-abd4966e0440'
  // );

  // const signer = kriptonio.wallet.connectSmartContract(
  //   smartContract,
  //   'testWallet123'
  // );

  // const contract = new ethers.Contract(
  //   smartContract.deployment!.address,
  //   smartContract.abi,
  //   signer
  // );

  // const response = await contract.mint(
  //   '0x13a11CeC9970d58E1170e98d28D2812a23890341',
  //   '1'
  // );
  // console.log('contract name', response);

  // const password = 'testWallet123';
  // const wallet = await kriptonio.wallet.create({
  //   title: 'test wallet',
  //   password,
  //   type: 'SmartWallet',
  // });
  const kriptonio = new KriptonioClient('<access-token>');

  const signer = await kriptonio.wallet.signer({
    chainId: 80001,
    walletId: '<wallet-id>',
    walletPassword: '<wallet-password>',
  });

  const tx = await signer.sendTransaction({
    to: await signer.getAddress(),
    value: 0,
  });
  console.log('tx hash', tx.hash);

  // const userOp = await signer.sendUserOperation({
  //   to: wallet.address,
  //   value: 0,
  // });
  // console.log('user op hash', userOp);

  // const signer = client.wallet.connect({
  //   walletId: '50238a98-6dfd-451a-8d6c-c8d80d404bdb',
  //   chainId: 80001,
  //   walletPassword: 'testWallet123',
  // });

  // const address = await signer.getAddress();
  // console.log('wallet address', address);

  // const signed = await signer.signTypedData(
  //   {
  //     name: 'Ether Mail',
  //     version: '1',
  //     chainId: 1,
  //     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  //   },
  //   {
  //     Person: [
  //       {
  //         name: 'name',
  //         type: 'string',
  //       },
  //       {
  //         name: 'wallet',
  //         type: 'address',
  //       },
  //     ],
  //     Mail: [
  //       {
  //         name: 'from',
  //         type: 'Person',
  //       },
  //       {
  //         name: 'to',
  //         type: 'Person',
  //       },
  //       {
  //         name: 'contents',
  //         type: 'string',
  //       },
  //     ],
  //   },
  //   {
  //     from: {
  //       name: 'Cow',
  //       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  //     },
  //     to: {
  //       name: 'Bob',
  //       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  //     },
  //     contents: 'Hello, Bob!',
  //   }
  // );

  // console.log('signed type', signed);

  // const message = 'Hello World!';
  // const signature = await signer.signMessage(message);
  // console.log('message signature', signature);

  // const signedTx = await signer.signTransaction({
  //   to: address,
  //   value: 0,
  // });
  // console.log('signed tx', signedTx);

  // const balance = await signer.provider?.getBalance(address);
  // console.log('balance', balance);

  // const tx = await signer.sendTransaction({
  //   to: address,
  //   value: 0,
  // });
  // console.log('tx hash', tx.hash);
}

main().catch(console.error);
