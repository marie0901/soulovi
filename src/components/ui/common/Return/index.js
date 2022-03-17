import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Image from 'next/image';

export const Return = ({}) => {
  const storage = globalThis?.sessionStorage;
  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);
  }

  return (
    <div className="w-full h-32 flex items-center border-b border-stone-100 pt-10 mb-10 font-lato">
      <div className="pr-[1.5rem]">
        <Image src="/images/arrow.svg" width={40} height={20}></Image>
      </div>

      <div>{storage?.currentPath}</div>
    </div>
  );
};
