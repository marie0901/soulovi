import { marketplaceAddress } from '../../config'
//TODO add NEXT_PUBLIC_NETWORK_ID to process.env
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID
// const NETWORK_ID = 4;

export const loadContract = async (name, web3) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()
  let contract = null

  try {
    contract = new web3.eth.Contract(Artifact.abi, marketplaceAddress)
  } catch {
    console.log(`Contract ${name} cannot be loaded`)
  }

  return contract
}
