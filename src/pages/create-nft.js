import { FileUploader } from 'react-drag-drop-files';

import Image from 'next/image';

import { LazyMinter } from '@components/LazyMinter';
import NFTMarketplace from '@utils/NFTMarketplace.json';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Web3Modal from 'web3modal';
import { marketplaceAddress } from '../../config';

import { BaseLayout } from '@components/ui/layout';
import { Button } from '@components/ui/common/Button';
import { Return } from '@components/ui/common/Return';
import { InputAfter } from '@components/ui/common/CustomInput';

import { FileContainer, Overlay } from '@styles/pages/create-ntf';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fileTypes = ['jpeg', 'jpg', 'png', 'gif'];

export default function CreateNtf() {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);

  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
    artist: '',
  });

  async function onChange(file) {
    setFile(file);
    setImgSrc(window.URL.createObjectURL(file));
    /* upload image to IPFS */

    // const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: prog => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function uploadToIPFS() {
    // console.log('!!!!!!! formInput', formInput);
    const { name, description, artist, price } = formInput;
    // console.log('!!!!!!! artist', artist);
    if (!name || !description || !artist || !price || !fileUrl) return;
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name,
      description,
      artist,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }

    URL.revokeObjectURL(imgSrc);
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* create the NFT */
    const price = ethers.utils.parseEther(formInput.price);
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    /* lazy minting */
    const lazyminter = new LazyMinter({ contract, signer });
    const tokenId = await contract.getCurrentTokenId();
    const voucher = await lazyminter.createVoucher(
      +tokenId + 1,
      `${url}`,
      price
    );
    // console.log('!!!!voucher', voucher);

    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(voucher, {
      value: 0,
    });
    await transaction.wait();
    router.push('/');
  }

  return (
    <div className="w-full">
      <Return />
      <div className="text-ukrblue">
        !!! TODO: The page is under development. Please clarify the
        requirenments!
      </div>
      <div className="container mx-auto h-full flex flex-row">
        <div className="w-[43rem] flex h-[43.75rem] flex-col pr-[2.5rem] border-box border-r border-stone-[#D3D6DB]">
          <div className="w-full h-full overflow-hidden rounded-2xl border border-stone-[#D3D6DB] bg-[#FAFAFA]">
            <FileUploader
              handleChange={onChange}
              fileOrFiles={file}
              name="file"
              types={fileTypes}
            >
              {file ? (
                <FileContainer className="w-full h-full relative">
                  <Overlay className="w-full h-full flex justify-center items-center">
                    <Image
                      src="/images/re-upload1.png"
                      width={113}
                      height={143}
                    ></Image>
                  </Overlay>
                  <img className="w-full h-full" src={imgSrc} />
                </FileContainer>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src="/images/upload1.png"
                    width={113}
                    height={143}
                  ></Image>
                </div>
              )}
            </FileUploader>
          </div>
        </div>
        <div className="w-[43rem] flex h-[43.75rem] flex-col pl-[2.5rem] border-box">
          <div className="font-lato text-xl flex flex-col border-box mb-[1.5rem] border-b border-dashed border-stone-[#D3D6DB]">
            <input
              placeholder="Item Name"
              className="mb-[1.5rem] border rounded-lg p-4"
              onChange={e =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder="Item Description"
              className="border rounded-lg p-4 mb-[1.5rem]"
              onChange={e =>
                updateFormInput({
                  ...formInput,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="font-lato text-xl flex flex-col border-box mb-[1.5rem] border-b border-dashed border-stone-[#D3D6DB]">
            <input
              placeholder="Artist"
              className="mb-[1.5rem] border rounded-lg p-4"
              onChange={e =>
                updateFormInput({ ...formInput, artist: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-between font-lato">
            <div className="flex grow-1 mb-[1rem]  text-xl">
              <InputAfter
                after={'ETH'}
                placeholder={'Price'}
                onChange={e =>
                  updateFormInput({ ...formInput, price: e.target.value })
                }
              />
              <InputAfter
                after={'%'}
                placeholder={'Royalties'}
                onChange={e =>
                  updateFormInput({ ...formInput, price: e.target.value })
                }
              />
            </div>
            <p className="text-[#868E95]">
              Moments its musical age explain. But extremity sex now education
              concluded earnestly her continual.
            </p>
          </div>
          <Button
            className="mt-auto"
            fontFamily="lato"
            size="lg"
            variant="black"
            rounded="full"
            onClick={listNFTForSale}
          >
            List Item
          </Button>
        </div>
      </div>
    </div>
  );
}

CreateNtf.Layout = BaseLayout;
