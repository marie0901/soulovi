import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useWeb3 } from '@components/providers';
import { useAllNfts, useWalletInfo } from '@components/hooks/web3';
import { BaseLayout } from '@components/ui/layout';
import { WalletBar } from '@components/ui/web3';
import { CardNft } from '@components/ui/card-nft';

import { getAllNfts } from '@content/nfts/fetcher';

import { marketplaceAddress } from '../../config';
import NFTMarketplace from '@utils/NFTMarketplace.json';

if (typeof window === 'undefined') {
  require('dotenv').config();
}

export default function AllNfts() {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
  const { allNfts } = useAllNfts(account.data);
  console.log('!!!account.data: ', account.data);
  console.log('!!!allNfts: ', allNfts);

  return allNfts.data ? (
    <div className="container">
      <div className="pt-4">
        <WalletBar />
      </div>

      <div className="flex px-4 py-4">
        <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
          All NFTs
        </h2>
        <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
          {allNfts.data.length} items listed
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {allNfts.data.map((nft, i) => (
              <CardNft key={i} nft={nft}></CardNft>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div> No allNfts.hasInitialResponse </div>
  );
}

////////////////////////////////////////////////////////////////////////////////

// export default function AllNfts() {
//   const [nfts, setNfts] = useState([]);
//   const [loadingState, setLoadingState] = useState("not-loaded");
//   useEffect(() => {
//     loadNFTs();
//   }, []);
//   async function loadNFTs() {
//     /* create a generic provider and query for unsold market items */
//     // const provider = new ethers.providers.JsonRpcProvider();
//     const provider = new ethers.providers.AlchemyProvider(
//       "rinkeby",
//       process.env.ALCHEMY_API_KEY
//     );
//     const contract = new ethers.Contract(
//       marketplaceAddress,
//       NFTMarketplace.abi,
//       provider
//     );
//     const data = await contract.fetchMarketItems();
//     /*
//      *  map over items returned from smart contract and format
//      *  them as well as fetch their token metadata
//      */
//     const items = await Promise.all(
//       data.map(async (i) => {
//         // const tokenUri = await contract.tokenURI(i.tokenId);
//         const tokenUri = i.tokenURI;
//         const meta = await axios.get(tokenUri);
//         let price = ethers.utils.formatUnits(i.price.toString(), "ether");
//         let item = {
//           price,
//           tokenId: i.tokenId.toNumber(),
//           seller: i.seller,
//           owner: i.owner,
//           image: meta.data.image,
//           name: meta.data.name,
//           description: meta.data.description,
//         };
//         return item;
//       })
//     );
//     setNfts(items);
//     setLoadingState("loaded");
//   }

//   if (loadingState === "loaded" && !nfts.length)
//     return (
//       <div className="container">
//         <div className="pt-4">
//           <WalletBar />
//         </div>
//         <div className="flex px-4 py-4">
//           <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
//             All NFTs
//           </h2>
//           <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
//             {nfts.length} items listed
//           </div>
//         </div>

//         <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
//       </div>
//     );
//   return (
//     <div className="container">
//       <div className="pt-4">
//         <WalletBar />
//       </div>
//       <div className="flex px-4 py-4">
//         <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
//           All NFTs
//         </h2>
//         <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
//           {nfts.length} items listed
//         </div>
//       </div>
//       {loadingState === "loaded" ? (
//         <div className="flex justify-center">
//           <div className="px-4" style={{ maxWidth: "1600px" }}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
//               {nfts.map((nft, i) => (
//                 // <div>jkjkjkjk</div>
//                 <CardNft key={i} nft={nft}></CardNft>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>LOADING...</div>
//       )}
//     </div>
//   );
// }

// export function getStaticProps() {
//   const { data } = getAllNfts();
//   return {
//     props: {
//       nfts: data,
//     },
//   };
// }

AllNfts.Layout = BaseLayout;
