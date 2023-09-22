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

const ItemsPerPage = 8;

const Dashboard = () => {
  const { data: session } = useSession();

  console.log(session);

  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data: itemsData, isLoading, isFetching } = useFetchDashboard();

  const totalItems = itemsData?.length || 0;
  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
    router.push('/login');
  };

  if (isLoading) {
    return (
      <LoadingAnimation/>
    );
  }

  if (isFetching) {
    return (
      <LoadingAnimation/>
    );
  }

  let currentItems: any[] = []; 

  if (Array.isArray(itemsData)) {
    const startIndex = (page - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    currentItems = itemsData.slice(startIndex, endIndex);
  }

  return (
    <div>
      <Header onSignOut={handleSignOut} />
  
      {totalItems > 0 ? (
        <div>
          <ul className='grid grid-cols-4 gap-3'>
            {currentItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className='border rounded text-slate-50 p-2'>
                <Image
                  src={item.image}
                  alt={item.category}
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full h-auto'
                />
                <p>{item.category}</p>
                <p>Size: {item.size}</p>
                <p>Price Range: {item.price_range}</p>
                <p>Color: {item.color}</p>
                <RemoveButton itemId={item.id} category={item.category} />
              </li>
            ))}
          </ul>
          <div className='p-2 flex justify-center gap-2'>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setPage(pageIndex + 1)}
                className={`
                  text-slate-50 text-2xl p-4 rounded-lg border-gray-800 border-2
                  ${page === pageIndex + 1 ? 'active' : ''}
                  hover:bg-gray-200 hover:text-gray-800
                `}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <NoItems />
      )}
      {isFetching ? <p className='text-slate-50'>Loading more...</p> : null}
    </div>
  );
  

};

export default Dashboard;
