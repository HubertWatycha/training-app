'use client';

import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ChooseButton from '@/app/(components)/chooseButton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useClothingContext } from '../layout';

interface Short {
  id: number;
  size: string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}


const Shorts: React.FC = () => {
  const { selectedColor } = useClothingContext();

  const { data: session } = useSession();
  console.log('useSession Hook session object', session);

  const { data: shorts } = useQuery({
    queryKey: ['shorts', selectedColor],
    queryFn: async () => {
      const response = await axios.get('api/shorts/');
      if (!Array.isArray(response.data)) {
        return [];
      }

      const filteredShorts = response.data.filter((Shorts: Short) => {
        return !selectedColor || Shorts.color === selectedColor;
      });

      return filteredShorts;
    },
    staleTime: 0,
  });

  return (
    <section className=''>
      <ul className='grid grid-cols-4 gap-3'>
        {shorts?.map((Shorts: Short) => (
          <li key={Shorts.id} className='border rounded'>
            <Image
              src={Shorts.image}
              alt={Shorts.category}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
            <div className='flex justify-center text-slate-50 gap-2 p-4'>
              <p>Price: {Shorts.price_range}$</p>
              <p>Color: {Shorts.color}</p>
              <ChooseButton itemId={Shorts.id} category={Shorts.category} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shorts;
