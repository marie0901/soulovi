import Link from 'next/link';

export const Return = ({}) => {
  const storage = globalThis?.sessionStorage;

  return (
    <div className="flex flex-col justify-center">
      <Link href={storage ? storage.prevPath : '#'}>
        <a href="#" className=" " aria-current="page">
          <img className="block  h-4 w-auto" src="/images/arrow.svg"></img>
        </a>
      </Link>
    </div>
  );
};
