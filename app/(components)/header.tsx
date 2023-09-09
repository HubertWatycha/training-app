'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onSignOut: () => void;
}

const Header = ({ onSignOut }: HeaderProps) => {
  const [upperBodyDropdownOpen, setUpperBodyDropdownOpen] = useState(false);
  const [lowerBodyDropdownOpen, setLowerBodyDropdownOpen] = useState(false);

  const toggleUpperBodyDropdown = () => {
    setUpperBodyDropdownOpen((prev) => !prev);
  };

  const toggleLowerBodyDropdown = () => {
    setLowerBodyDropdownOpen((prev) => !prev);
  };

  return (
    <header className='mb-3'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-black'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='flex items-center lg:order-2'>
            <Link
              href='/login'
              className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
              Log in
            </Link>
            <Link
              href='/register'
              className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
              Register
            </Link>
            <button
              onClick={onSignOut}
              className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
              Sign Out
            </button>
            <Link
              href='/dashboard'
              className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
              Dashboard
            </Link>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <button
                  onClick={toggleUpperBodyDropdown}
                  className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
                  Upper body
                </button>
                {upperBodyDropdownOpen && (
                  <div
                    id='upperBodyDropdown'
                    className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black absolute p-4'>
                    <ul
                      className='py-2 text-sm text-gray-700 dark:text-slate-50'
                      aria-labelledby='multiLevelDropdownButton'>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/hoodies'>Hoodies</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/'>Sweaters</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/'>Shirts</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/tshirts'>T-Shirts</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/'>Jackets</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={toggleLowerBodyDropdown}
                  className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
                  Lower body
                </button>
                {lowerBodyDropdownOpen && (
                  <div
                    id='lowerBodyDropdown'
                    className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black absolute p-4'>
                    <ul
                      className='py-2 text-sm text-gray-700 dark:text-slate-50'
                      aria-labelledby='multiLevelDropdownButton'>
                      <li  className='p-2 hover:bg-gray-700'>
                        <Link href='/shoes'>Shoes</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/trousers'>Trousers</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/shorts'>Shorts</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/'>Belts</Link>
                      </li>
                      <li className='p-2 hover:bg-gray-700'>
                        <Link href='/'>Socks</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
