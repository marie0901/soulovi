import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

import Image from 'next/image';

export const Return = ({}) => {
  const storage = globalThis?.sessionStorage;
  // const router = useRouter();

  // useEffect(() => storePathValues, []);

  // function storePathValues() {
  //   console.log('!!!!here');
  //   if (!storage) return;
  //   // Set the previous path as the value of the current path.
  //   const prevPath = storage.getItem('currentPath');
  //   storage.setItem('prevPath', prevPath);
  //   // Set the current path value by looking at the browser's location object.
  //   storage.setItem('currentPath', globalThis.location.pathname);
  // }

  return (
    <div className="flex flex-col justify-center">
      <Link href={storage ? storage.prevPath : '#'}>
        <a href="#" className=" " aria-current="page">
          {/* <Image src="/images/arrow.svg" layout="fill"></Image> */}
          <img className="block  h-4 w-auto" src="/images/arrow.svg"></img>
        </a>
      </Link>
      {/* <div className="pr-[1.5rem]">
        <Image src="/images/arrow.svg" width={40} height={20}></Image>
      </div>

      <div className="text-4xl font-medium">{storage?.prevPath}</div> */}
    </div>
  );
};
