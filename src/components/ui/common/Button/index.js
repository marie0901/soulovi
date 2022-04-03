const SIZE = {
  xs: 'text-xs px-8 py-1',
  sm: 'p-2 text-base xs:px-4',
  md: 'p-3 text-base xs:px-8',
  lg: 'p-3 text-lg xs:px-8',
};

export const Button = ({
  children,
  className,
  size = 'xs',
  hoverable = true,
  variant = 'blue',
  rounded = 'full',
  // fontFamily = 'mono',
  ...rest
}) => {
  const sizeClass = SIZE[size];
  const variants = {
    black: `text-white bg-black ${hoverable && 'hover:bg-[#373737]'}`,
    white: `text-black bg-white`,
    blue: `text-white bg-ukrblue ${hoverable && 'hover:bg-blue-400'}`,
    purple: `text-white bg-indigo-600 ${hoverable && 'hover:bg-indigo-700'}`,
    red: `text-white bg-red-600 ${hoverable && 'hover:bg-red-700'}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && 'hover:bg-indigo-200'
    }`,
  };

  return (
    <button
      {...rest}
      className={`${sizeClass}   disabled:opacity-50 disabled:cursor-not-allowed border rounded-${rounded} ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

{
  /* <div className="ml-3 mr-3 relative">
  <Link href="/create-nft">
    <a
      href="#"
      className=" border border-gray-400 rounded-full  text-gray-500 px-8 py-1  text-xs"
      aria-current="page"
    >
      Create
    </a>
  </Link>
</div>; */
}
