import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-6">
      <nav>
        <a href="#home" className="mr-4 hover:text-yellow-300">
          Home
        </a>
        <a href="#projects" className="mr-4 hover:text-yellow-300">
          Projects
        </a>
        <a href="#about" className="hover:text-yellow-300">
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;