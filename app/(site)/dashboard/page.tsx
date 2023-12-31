'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/app/(components)/header';
import RemoveButton from '@/app/(components)/removeButton';
import NoItems from '@/app/(components)/noItems';
import useFetchDashboard from '@/app/(components)/(hooks)/useFetchDashboard';
import LoadingAnimation from '@/app/(components)/loadingAnimation';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Footer from '@/app/(components)/footer';

const ItemsPerPage = 8;
let currentItems: any[] = [];
const pagesToShow = 4;

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
    router.push('/login');
  };

  const { data: itemsData, isLoading, isFetching } = useFetchDashboard();

  const totalItems = itemsData?.length || 0;
  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const pageRangeStart = Math.max(1, page - Math.floor(pagesToShow / 2));
  const pageRangeEnd = Math.min(totalPages, pageRangeStart + pagesToShow - 1);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    (pageNumber) => pageNumber >= pageRangeStart && pageNumber <= pageRangeEnd
  );

  if (Array.isArray(itemsData)) {
    const startIndex = (page - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    currentItems = itemsData.slice(startIndex, endIndex);
  }

  if (isFetching || isLoading) {
    <section>
      <Header onSignOut={handleSignOut} />
      <LoadingAnimation />
    </section>;
  }

  return (
    <div>
      <Header onSignOut={handleSignOut} />

      <>
        <ul className='grid grid-cols-4 gap-3 my-3'>
          {currentItems.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className='rounded p-2'>
              <Image
                src={item.image}
                alt={item.category}
                width='0'
                height='0'
                sizes='100vw'
                className='w-full h-auto'
              />
              <p className='text-text font-bold'>{item.category}</p>
              <p className='text-text font-bold'>Size: {item.size}</p>
              <p className='text-text font-bold'>Price Range: ${item.price_range}</p>
              <p className='text-text font-bold'>Color: {item.color}</p>
              <RemoveButton itemId={item.id} category={item.category}/>
            </li>
          ))}
        </ul>
        {totalItems > 0 ? (
          <div className='p-2 flex justify-center gap-2'>
            <div className='flex items-center'>
              <BiChevronLeft
                className='text-button text-4xl cursor-pointer'
                onClick={goToPreviousPage}
              />
            </div>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`
                    text-button text-3xl p-4 rounded-lg border-2
                    ${page === pageNumber ? 'active' : ''}
                    hover:bg-button hover:text-background
                  `}>
                {pageNumber}
              </button>
            ))}
            <div className='flex items-center'>
              <BiChevronRight
                className='text-button text-4xl cursor-pointer'
                onClick={goToNextPage}
              />
            </div>
          </div>
        ) : (
          <NoItems />
        )}
      </>
      <Footer/>
    </div>
  );
};

export default Dashboard;
