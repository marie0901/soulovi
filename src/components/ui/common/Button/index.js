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
    gray: `text-gray-500 border border-gray-400 bg-white ${
      hoverable && 'hover:bg-blue-400'
    } `,
    blue: `text-white border border-ukrblue bg-ukrblue ${
      hoverable && 'hover:bg-blue-400'
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
