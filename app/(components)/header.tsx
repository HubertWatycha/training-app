'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeAvatar } from './changeUserAvatar';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import SearchBar from './SearchBar';

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
    <header className='border-b-2 bg-secondaryb-3 '>
      <nav className='bg-background px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='flex items-center lg:order-2'>
            {session ? (
              <>
                <button
                  onClick={onSignOut}
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Sign Out
                </button>
                <Link
                  href='/dashboard'
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Dashboard
                </Link>
                <SearchBar />
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Log in
                </Link>
                <Link
                  href='/register'
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Register
                </Link>
              </>
            )}
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
            <ul className='flex flex-col mt-4 font-bold lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <button
                  onClick={toggleUpperBodyDropdown}
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Upper body
                </button>
                {upperBodyDropdownOpen && (
                  <div
                    id='upperBodyDropdown'
                    className='z-10 divide-y divide-gray-100 rounded-lg shadow w-44 absolute p-4'>
                    <ul
                      className='py-2 text-sm text-text'
                      aria-labelledby='multiLevelDropdownButton'>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/hoodies'>Hoodies</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/'>Sweaters</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/'>Shirts</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/tshirts'>T-Shirts</Link>
                      </li>
                      <li className='p-2 transition-colors hover-bg-primary hover-bg-opacity-20'>
                        <Link href='/'>Jackets</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={toggleLowerBodyDropdown}
                  className='text-text hover-bg-primary focus:ring-4 focus:ring-primary font-bold text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                  Lower body
                </button>
                {lowerBodyDropdownOpen && (
                  <div
                    id='lowerBodyDropdown'
                    className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute p-4'>
                    <ul
                      className='py-2 text-sm text-text'
                      aria-labelledby='multiLevelDropdownButton'>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/shoes'>Shoes</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/trousers'>Trousers</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/shorts'>Shorts</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20 border-b border-primary'>
                        <Link href='/'>Belts</Link>
                      </li>
                      <li className='p-2 hover-bg-primary hover-bg-opacity-20'>
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
                  <div className='rounded-full h-8 w-8 mr-2 bg-accent'></div>
                )}
                <span className='text-text font-bold'>{userName}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 backdrop-blur-lg'>
          <dialog open className='p-10 bg-black rounded-xl mt-20 relative'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 p-2 text-primary hover-bg-primary focus:ring-4 focus:ring-primary font-bold rounded-full focus:outline-none'>
              <AiOutlineClose size={24} />
            </button>
            <form onSubmit={onSubmit}>
              <div className='flex flex-col items-center'>
                <input
                  type='text'
                  placeholder='Enter avatar link'
                  value={avatarLink}
                  onChange={handleLinkChange}
                  className='w-72 text-text bg-background border border-primary rounded-lg p-4 m-2 focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <span className='my-2 text-text'>or</span>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='w-72 text-text bg-background border border-primary rounded-lg p-4 m-2 focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <button
                type='submit'
                className='bg-primary hover-bg-primary text-white font-bold rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary'>
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
