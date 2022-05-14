export const Footer = () => {
  return (
    <footer className=" text-center py-4 lg:text-left  text-gray-600">
      <div className="font-mono text-xs flex justify-center items-center lg:justify-between  border-gray-300">
        <div className="mr-12 hidden lg:block ">
          <span>About Us</span>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/soulovi.art"
            className="mr-6 text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com/soulovi_art"
            className="mr-6 text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};
