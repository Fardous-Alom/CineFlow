"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  IoMenu,
  IoSearch,
  IoCart,
  IoPersonSharp,
  IoClose,
} from "react-icons/io5";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.totalItems);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Close dropdown when opening sidebar to avoid overlap
    if (!isSidebarOpen && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Overlay - only shown when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeAll}
        />
      )}

      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            {/* sidebar button */}
            <button
              onClick={toggleSidebar}
              aria-controls="default-sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
            >
              {isSidebarOpen ? (
                <IoClose className="size-6" />
              ) : (
                <IoMenu className="size-6" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </button>

            {/* sidebar */}
            <aside
              id="default-sidebar"
              className={` md:hidden fixed top-15 left-0 z-40 w-64 h-screen transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } sm:translate-x-0`}
              aria-label="Sidenav"
            >
              <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                      <span className="ml-3">Overview</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            {/* logo */}
            <Link
              href="https://flowbite.com"
              className="flex items-center justify-between mr-4"
            >
              <Image
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
                width={32}
                height={32}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Flowbite
              </span>
            </Link>

            {/* search */}
            <form action="#" method="GET" className="hidden md:block md:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative md:w-64">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <IoSearch className="size-6" />
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300"
            >
              <span className="sr-only">Toggle search</span>
              <IoSearch className="size-6" />
            </button>

            {/* cart*/}
            <Link
              href="/cart"
              className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
            >
              <IoCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* user menu */}
            <div className="relative">
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <IoPersonSharp className="size-6 text-white" />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow rounded-xl"
                  id="dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900">
                      Neil Sims
                    </span>
                    <span className="block text-sm text-gray-900 truncate">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul className="py-1 text-gray-700" aria-labelledby="dropdown">
                    <li>
                      <Link
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        My profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        Account settings
                      </Link>
                    </li>
                  </ul>
                  <ul className="py-1 text-gray-700" aria-labelledby="dropdown">
                    <li>
                      <Link
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        <svg
                          className="mr-2 w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        My likes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        <svg
                          className="mr-2 w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                        </svg>
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        <span className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="mr-2 w-5 h-5 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Pro version
                        </span>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                  <ul className="py-1 text-gray-700" aria-labelledby="dropdown">
                    <li>
                      <Link
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
