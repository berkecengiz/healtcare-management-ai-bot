// components/Header.js

const Header = () => {
    return (
    <header className="bg-blue-500 text-white body-font shadow w-full">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-xl">My Healthcare Chat Bot</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {/* Add navigation links if needed */}
          </nav>
        </div>
    </header>
    );
  };
  
  export default Header;
  