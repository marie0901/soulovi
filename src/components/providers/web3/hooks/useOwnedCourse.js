import useSWR from "swr";

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      // const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()

      // if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
      //   return null
      // }

      return {};
    }
  );

  return swrRes;
};
