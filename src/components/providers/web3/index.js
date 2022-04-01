import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from '@utils/loadContract';
import Web3 from 'web3';
import { setupHooks } from './hooks/setupHooks';

const Web3Context = createContext(null);

const setListeners = provider => {
  provider.on('chainChanged', _ => window.location.reload());
};

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract('NFTMarketplace', web3);

        setListeners(provider);
        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            isLoading: false,
          })
        );
      } else {
        // provider=ethers.getDefaultProvider( [ network , [ options ] ] )
        // const provider = ethers.getDefaultProvider('rinkeby');

        // const provider = new ethers.providers.AlchemyProvider(
        //   'rinkeby',
        //   '-mD-41-Z7FEHWYFciR3Nt5GYJLwxskj7'
        // );
        const provider = new ethers.providers.InfuraProvider('rinkeby', {
          projectId: '1e7a207b3ad54bcc878e6f07ea962e12',
          projectSecret: 'ff3ba0951aac409dbc1bc4655747b9fd',
        });

        const web3 = new Web3(provider);
        const contract = await loadContract('NFTMarketplace', web3);

        // setListeners(provider);
        // setWeb3Api(
        //   createWeb3State({
        //     web3,
        //     provider,
        //     contract,
        //     isLoading: false,
        //   })
        // );
        console.log('!!!!!66666contract', contract);

        let mmm = await contract.methods
          .balanceOf('0x80BC2298872D8C88f0Eca80fA1a63953Ac3093F8')
          .call();
        // let mmm = await contract.methods.fetchMarketItems().call();
        console.log('!!!!!7777mmm', mmm);
        // setWeb3Api(api => ({ ...api, isLoading: false }));
        console.error('Please, install Metamask.');
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: 'eth_requestAccounts' });
            } catch {
              location.reload();
            }
          }
        : () =>
            console.error(
              'Cannot connect to Metamask, try to reload your browser please.'
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
  const { hooks } = useWeb3();
  return cb(hooks);
}
