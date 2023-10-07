'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeAvatar } from './changeUserAvatar';
import { useEffect, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

interface HeaderProps {
  onSignOut: () => void;
}

const Header = ({ onSignOut }: HeaderProps) => {
  const { data: session } = useSession();

  const userAvatar = session?.user?.image;
  const userName = session?.user?.name;

  const [upperBodyDropdownOpen, setUpperBodyDropdownOpen] = useState(false);
  const [lowerBodyDropdownOpen, setLowerBodyDropdownOpen] = useState(false);

  const {
    isModalOpen,
    openModal,
    closeModal,
    onSubmit,
    handleLinkChange,
    handleFileChange,
    avatarLink,
    isAvatarModalOpen,
  } = ChangeAvatar();

  const toggleUpperBodyDropdown = () => {
    setUpperBodyDropdownOpen((prev) => !prev);
  };

  const toggleLowerBodyDropdown = () => {
    setLowerBodyDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAvatarModalOpen) {
      document.body.classList.add('blur-md');
    } else {
      document.body.classList.remove('blur-md');
    }
  }, [isAvatarModalOpen]);

  return (
    <header className='mb-3'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-black'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='flex items-center lg:order-2'>
            {session ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
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
                      <li className='p-2 hover-bg-gray-700'>
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
                      <li className='p-2 hover:bg-gray-700'>
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
                      <li className='p-2 hover-bg-gray-700'>
                        <Link href='/'>Socks</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            {session && (
              <div className='flex items-center'>
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    width={32}
                    height={32}
                    alt={`${userName}'s Avatar`}
                    className='rounded-full h-8 w-8 mr-2 cursor-pointer'
                    onClick={openModal}
                  />
                ) : (
                  <div className='rounded-full h-8 w-8 mr-2 bg-gray-300 dark:bg-gray-700'></div>
                )}
                <span className='text-gray-800 dark:text-white'>
                  {userName}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 backdrop-blur-lg'>
          <dialog open className='p-6 bg-gray-800 mt-20 relative'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 p-2 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-full dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'>
              <AiOutlineClose size={24} />
            </button>
            <form onSubmit={onSubmit}>
              <div className='flex flex-col items-center'>
                <input
                  type='text'
                  placeholder='Enter avatar link'
                  value={avatarLink}
                  onChange={handleLinkChange}
                  className='w-72 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 m-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />
                <span className='my-2 text-gray-600 dark:text-gray-400'>
                  or
                </span>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='w-72 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 m-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />
              </div>
              <button
                type='submit'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
                Change Avatar
              </button>
            </form>
          </dialog>
        </div>
      )}
    </header>
  );
};

export default Header;
