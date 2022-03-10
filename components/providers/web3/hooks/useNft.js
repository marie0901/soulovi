import useSWR from "swr";

export const handler = (web3, contract) => (nft, account) => {
  console.log("!!!!contract", contract);
  // console.log("!!!!contract", contract);
  // console.log("!!!!account", account);

  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/nft/${account}` : null),
    async () => {
      console.log("!!!!2222222222web3", web3);
      // const data = await contract.fetchMarketItems();
      const data = { a: "aaa", b: "bbb" };
      console.log("!!!!!333333data", data);

      return data;
    }
  );
  console.log("!!!!4444444swrRes", swrRes);
  return swrRes;
};
