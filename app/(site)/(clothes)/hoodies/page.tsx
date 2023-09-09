'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ChooseButton from '@/app/(components)/chooseButton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useClothingContext } from '../layout';
import { useRouter } from "next/navigation"

interface Hoodie {
  id: number;
  size: string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}

const Hoodies: React.FC = () => {
  const { selectedColor } = useClothingContext();
  const router = useRouter()
  const { data: session, status } = useSession();
  console.log('useSession Hook session object', session);


  const { data: hoodies } = useQuery({
    queryKey: ['hoodies', selectedColor],
    queryFn: async () => {
      const response = await axios.get('api/hoodies/');
      if (!Array.isArray(response.data)) {
        return [];
      }

      const filteredHoodies = response.data.filter((Hoodie: Hoodie) => {
        return !selectedColor || Hoodie.color === selectedColor;
      });
      toast.success('Filtered');
      return filteredHoodies;
    },
    staleTime: 0,
  });

  if (status === 'unauthenticated') {
    
    router.push('/login'); 
    return null;
  }

  return (
    <section className='bg-black'>
      <ul className='grid grid-cols-4 gap-2'>
        {hoodies?.map((Hoodie: Hoodie) => (
          <li key={Hoodie.id} className='border rounded'>
            <Image
              src={Hoodie.image}
              alt={Hoodie.category}
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-auto'
            />
            <div className='flex justify-center text-slate-50 gap-2 p-4'>
              <p>Price: {Hoodie.price_range}$</p>
              <p>Color: {Hoodie.color}</p>
              <ChooseButton itemId={Hoodie.id} category={Hoodie.category} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hoodies;
