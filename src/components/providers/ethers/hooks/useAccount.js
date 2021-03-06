import { useEffect } from 'react';
import useSWR from 'swr';

const adminAddresses = {
  //TODO this is somethig to think about. Doesn't work now
  '0xa075585816515fa3c6145fdd41bb53b18628df720548c9dd22709df630cacdc6': true,
  '0xfd36511c8035a501abab2a9414fc41361ac1e1212193c930db48a118289a2b2f': true,
};

export const handler = (ethers, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (provider ? 'ethers/accounts' : null),
    async () => {
      const accounts = await provider.listAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          'Cannot retreive an account. Please refresh the browser.'
        );
      }
      return account;
    }
  );

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null);
    provider?.on('accountsChanged', mutator);

    return () => {
      provider?.removeListener('accountsChanged', mutator);
    };
  }, [provider]);

  return {
    data,
    // TODO: think how to use keccak256 with ethers.js or just import web3 here?
    // isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    isAdmin: true,

    mutate,
    ...rest,
  };
};
