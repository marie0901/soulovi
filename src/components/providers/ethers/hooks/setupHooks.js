import { handler as createAccountHook } from './useAccount';
import { handler as createNetworkHook } from './useNetwork';

import { handler as createAllNftsHook } from './useAllNfts';
import { handler as createNftHook } from './useNft';

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: createAccountHook(web3, provider),
    useNetwork: createNetworkHook(provider),
    useAllNfts: createAllNftsHook(web3, contract),
    useNft: createNftHook(web3, contract),
  };
};
