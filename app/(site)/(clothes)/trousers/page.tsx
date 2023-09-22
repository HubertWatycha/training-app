'use client';

import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ChooseButton from '@/app/(components)/chooseButton';
import { useQuery } from '@tanstack/react-query';
import { useClothingContext } from '../layout';
import React from 'react';
import toast from 'react-hot-toast';

interface Trousers {
  id: number;
  size: string;
  gender: string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}

const Trousers: React.FC = () => {
  const { selectedColor, selectedGender } = useClothingContext();

  const { data: session } = useSession();
  console.log('useSession Hook session object', session);

  const { data: trousers } = useQuery({
    queryKey: ['trousers', selectedColor, selectedGender],
    queryFn: async () => {
      const response = await axios.get('api/trousers/');
      if (!Array.isArray(response.data)) {
        return [];
      }

      const filteredTrousers = response.data.filter((Trousers: Trousers) => {
        const colorMatch = !selectedColor || Trousers.color === selectedColor;
        const genderMatch = !selectedGender || Trousers.gender === selectedGender;
        return colorMatch && genderMatch;
      });
      toast.success('Filtered');
      return filteredTrousers;
    },
    staleTime: 0,
  });
  return (
    <section className=''>
      <ul className='grid grid-cols-4 gap-3'>
        {trousers?.map((Trousers: Trousers) => (
          <li key={Trousers.id} className='border rounded'>
            <Image
              src={Trousers.image}
              alt={Trousers.category}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
            <div className='flex justify-center text-slate-50 gap-2 p-4'>
              <p>Price: {Trousers.price_range}$</p>
              <p>Color: {Trousers.color}</p>
              <ChooseButton itemId={Trousers.id} category={Trousers.category} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Trousers;
