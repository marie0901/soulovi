import { useEffect, useState, createContext, useContext, useMemo } from 'react';
import Web3Modal from 'web3modal';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { loadContract } from '@utils/loadContract';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'web3modal';
import { ethers } from 'ethers';
import NFTMarketplace from '@utils/NFTMarketplace.json';
import { marketplaceAddress } from '../../../../config';
import { setupHooks } from './hooks/setupHooks';

const EthersContext = createContext(null);
const providerOptions = {
  /* See Provider Options Section */
  // walletconnect: {
  //   package: WalletConnectProvider,
  // },
};

// const setListeners = provider => {
//   provider.on('chainChanged', _ => window.location.reload());
// };

const setListeners = () => {
  if (window.ethereum) {
    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('!!!!!!metamaskProvider', metamaskProvider);
    // metamaskProvider.provider.on('accountsChanged', _ =>
    //   window.location.reload()
    // );
    metamaskProvider.provider.on('chainChanged', _ => window.location.reload());
  }
};

const createEthersState = ({
  ethers,
  provider,
  signer,
  contract,
  isLoading,
}) => {
  return {
    ethers,
    provider,
    signer,
    contract,
    isLoading,
    hooks: setupHooks({ ethers, provider, contract }),
  };
};

export default function EthersProvider({ children }) {
  const [ethersApi, setEthersApi] = useState(
    createEthersState({
      ethers: null,
      provider: null,
      signer: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const installMetamask = async () => {
      providerOptions['custom-metamask'] = {
        display: {
          logo: providers.METAMASK.logo,
          name: 'Install MetaMask',
          description: 'Connect using browser wallet',
        },
        package: {},
        connector: async () => {
          throw new Error('MetaMask not installed');
        },
      };
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: providerOptions, // required
      });

      try {
        const connection = await web3Modal.connectTo('custom-metamask');
        const provider = new ethers.providers.Web3Provider(connection);
      } catch (err) {
        // alert(`${err}
        // Please install Metamask 'https://metamask.io' `);
        // window.open('https://metamask.io');
      }
    };

    const testWeb3Modal = async () => {
      const provider = new ethers.providers.AlchemyProvider(
        'rinkeby',
        '-mD-41-Z7FEHWYFciR3Nt5GYJLwxskj7'
      );
      console.log('!!!!alchemyProvider', provider);

      const contract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        provider
        // signer
      );

      setListeners();

      setEthersApi(
        createEthersState({
          ethers: ethers,
          provider: null,
          signer: null,
          contract,
          isLoading: false,
        })
      );
    };

    const loadProvider = async () => {
      const web3Modal = new Web3Modal();
      let connection = null;
      let provider = null;
      try {
        connection = await web3Modal.connect();
        provider = new ethers.providers.Web3Provider(connection);
      } catch (err) {
        console.error(err);
      }

      if (provider) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          marketplaceAddress,
          NFTMarketplace.abi,
          signer
        );

        setListeners();
        setEthersApi(
          createEthersState({
            ethers,
            provider,
            signer,
            contract,
            isLoading: false,
          })
        );
      } else {
        testWeb3Modal();
        console.error('Please, connect to your Metamask account.');
      }
    };

    // TODO maybe add this to the By NFT button if Metamask is not installed
    if (!window.ethereum) {
      testWeb3Modal();
    } else {
      loadProvider();
    }
  }, []);

  const _ethersApi = useMemo(() => {
    const { ethers, provider, signer, contract, isLoading } = ethersApi;
    return {
      ...ethersApi,
      requireInstall:
        !isLoading &&
        !provider &&
        typeof window !== 'undefined' &&
        !window.ethereum,
      requireConnectMetamask:
        typeof window !== 'undefined' && window.ethereum && !provider,
      connect: async () => {
        try {
          const web3Modal = new Web3Modal();
          await web3Modal.connect();
        } catch {
          location.reload();
        }
      },
    };
  }, [ethersApi]);

  return (
    <EthersContext.Provider value={_ethersApi}>
      {children}
    </EthersContext.Provider>
  );
}

export function useEthers() {
  return useContext(EthersContext);
}

export function useHooks(cb) {
  const { hooks } = useEthers();
  return cb(hooks);
}
