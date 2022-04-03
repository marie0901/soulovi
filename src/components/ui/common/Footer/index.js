export const Footer = () => {
  return (
    <footer className="mt-8 text-center lg:text-left  text-gray-600">
      <div className="font-mono text-xs flex justify-center items-center lg:justify-between p-4  border-gray-300">
        <div className="mr-12 hidden lg:block ">
          <span>About Us</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="mr-6 text-gray-600">
            Instagram
          </a>
          <a href="#!" className="mr-6 text-gray-600">
            Twitter
          </a>
          <a href="#!" className="mr-6 text-gray-600">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};
