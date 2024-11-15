"use client";
import { DoorOpen, Search, SearchIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import { Input } from "../ui/input";

const SearchForm = ({onSearch}:any) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { register, handleSubmit, reset } = useForm();
  //   const router = useRouter();
  function handleSearch(data: any) {
    const { search } = data;
    onSearch(search)
    // router.push(`/search?search=${search}`);
    // reset();
  }
  return (
    <form
      className="flex items-center max-w-lg mx-auto"
      onSubmit={handleSubmit(handleSearch)}
    >
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full space-x-4">
        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div> */}
        <Input {...register("search")}  className="mr-4" />
        {/* <input
          {...register("search")}
          type="text"
          disabled={isHomePage ? false : true}
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search products..."
        /> */}
      </div>
      <Button type="submit" className="hidden md:flex">
        <Search className=" w-4 h-4 me-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
