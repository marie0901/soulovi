import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';

import { BaseLayout } from '@components/ui/layout';
import { CardNft } from '@components/ui/card-nft';

import { marketplaceAddress } from '../../config';

import NFTMarketplace from '@utils/NFTMarketplace.json';

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const router = useRouter();

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        NFTMarketplace.abi,
        signer
      );
      const data = await marketplaceContract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(async i => {
          const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            tokenURI,
          };
          return item;
        })
      );
      setNfts(items);
      setLoadingState('loaded');
    } catch (error) {
      console.error(error);
    }
  }

  function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>;
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="text-ukrblue">
        !!! TODO: The page is under development. Please clarify the
        requirenments!
      </div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <CardNft key={i} nft={nft}></CardNft>
          ))}
        </div>
      </div>
    </div>
  );
}
MyAssets.Layout = BaseLayout;
