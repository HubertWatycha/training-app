'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/app/(components)/header';
import RemoveButton from '@/app/(components)/removeButton';
import NoItems from '@/app/(components)/noItems';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Item {
  id: number;
  size: number | string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}
const ItemsPerPage = 8;


const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [page, setPage] = useState(0);

  console.log('useSession Hook session object', session);

  const fetchItems = async (page: number) => {
    const offset = page * ItemsPerPage;
    const response = await axios.get(`api/get?offset=${offset}&limit=${ItemsPerPage}`);
    if (!Array.isArray(response.data)) {
      return [];
    }
    const items = response.data.slice(0, ItemsPerPage);
    toast.success('Items have been fetched'); 
    return items;
  };

  const {
    isLoading,
    isError,
    data: items,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['clothes', page],
    queryFn: () => fetchItems(page),
    keepPreviousData: true,
  });

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
    router.push('/login');
  };

  return (
    <div>
      <Header onSignOut={handleSignOut} />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <NoItems />
      ) : items && items.length === 0 ? (
        <NoItems />
      ) : (
        <ul className='grid grid-cols-4 gap-3'>
          {items?.map((item: Item, index) => (
            <li
              key={`${item.id}-${index}`}
              className='border rounded text-slate-50'
            >
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
      )}
      {isFetching ? <p className='text-slate-50'>Loading more...</p> : null}
      <button onClick={() => setPage(page + 1)} disabled={isPreviousData} className='text-slate-50'>
        Load More
      </button>
    </div>
  );
};

export default Dashboard;