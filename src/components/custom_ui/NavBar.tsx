import React from "react";
import CartCount from "./CartCount";
import SearchForm from "./SearchForm";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar({ onSearch }:{onSearch?:any}) {
  
  return (
    <div className="bg-gray-50 dark:bg-lime-800 fixed top-0 w-full">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto px-8 gap-8">
       <Link to={"/"} >
       <Home/>
       </Link>
        <div className="flex-grow">
          <SearchForm onSearch={onSearch} />
        </div>
        <div className="flex gap-8">
          {/* <HelpModal/> */}
          <CartCount />
        </div>
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
}

export default NavBar;
