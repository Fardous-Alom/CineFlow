"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import {
  IoMenu,
  IoSearch,
  IoCart,
  IoPersonSharp,
  IoClose,
} from "react-icons/io5";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useSelector((state) => state.cart.totalItems);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
    if (!isSidebarOpen && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [isSidebarOpen, isDropdownOpen]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeAll = useCallback(() => {
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    },
    [searchQuery, router]
  );

  return (
    <>
      {/* Overlay - only shown when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <nav
        className="bg-gray-200 border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              aria-controls="mobile-menu"
              aria-expanded={isSidebarOpen}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
            >
              {isSidebarOpen ? (
                <IoClose className="size-6" aria-hidden="true" />
              ) : (
                <IoMenu className="size-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle mobile menu</span>
            </button>

            {/* Mobile menu */}
            <aside
              id="mobile-menu"
              className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out lg:hidden ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              aria-label="Mobile navigation menu"
            >
              <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                      onClick={closeAll}
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
                      <span className="ml-3">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                      onClick={closeAll}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                      </svg>
                      <span className="ml-3">Shop</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/best-sellers"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                      onClick={closeAll}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      <span className="ml-3">Best Sellers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/deals"
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                      onClick={closeAll}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="ml-3">Today's Deals</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center justify-between mr-4"
              aria-label="Home"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                eCommerce
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link
                  href="/shop"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/best-sellers"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700"
                >
                  Today's Deals
                </Link>
              </li>
            </ul>

            
          </div>

          <div className="flex items-center lg:order-2">
           
            

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <IoCart className="w-6 h-6" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <IoPersonSharp
                  className="size-6 text-white"
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow rounded-xl"
                  id="user-dropdown"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900">
                      Neil Sims
                    </span>
                    <span className="block text-sm text-gray-900 truncate">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="/profile"
                        className="block py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                        role="menuitem"
                      >
                        My profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block py-2 px-4 text-sm hover:bg-gray-100"
                        onClick={closeAll}
                        role="menuitem"
                      >
                        Account settings
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
};

export default memo(Navbar);
