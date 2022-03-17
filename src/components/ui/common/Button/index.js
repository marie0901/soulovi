const SIZE = {
  sm: 'p-2 text-base xs:px-4',
  md: 'p-3 text-base xs:px-8',
  lg: 'p-3 text-lg xs:px-8',
};

export const Button = ({
  children,
  className,
  size = 'md',
  hoverable = true,
  variant = 'purple',
  rounded = 'md',
  fontFamily = 'mono',
  ...rest
}) => {
  const sizeClass = SIZE[size];
  const variants = {
    black: `text-white bg-black ${hoverable && 'hover:bg-[#373737]'}`,
    white: `text-black bg-white`,
    green: `text-white bg-green-600 ${hoverable && 'hover:bg-green-700'}`,
    purple: `text-white bg-indigo-600 ${hoverable && 'hover:bg-indigo-700'}`,
    red: `text-white bg-red-600 ${hoverable && 'hover:bg-red-700'}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && 'hover:bg-indigo-200'
    }`,
  };

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed border rounded-${rounded} font-${fontFamily} ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};
