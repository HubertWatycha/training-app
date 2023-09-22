'use client';

import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ChooseButton from '@/app/(components)/chooseButton';
import { useQuery } from '@tanstack/react-query';
import { useClothingContext } from '../layout';
import toast from 'react-hot-toast';

interface Shoe {
  id: number;
  size: number;
  gender: string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}

const Shoes: React.FC = () => {
  const { selectedColor, selectedGender } = useClothingContext();

  const { data: session } = useSession();
  console.log('useSession Hook session object', session);

  const { data: shoes } = useQuery({
    queryKey: ['shoes', selectedColor, selectedGender],
    queryFn: async () => {
      const response = await axios.get('api/shoes/');
      if (!Array.isArray(response.data)) {
        return [];
      }

      const filteredShoes = response.data.filter((Shoe: Shoe) => {
        const colorMatch = !selectedColor || Shoe.color === selectedColor;
        const genderMatch = !selectedGender || Shoe.gender === selectedGender;
        return colorMatch && genderMatch;
      });
      toast.success('Filtered');
      return filteredShoes;
    },
    staleTime: 0,
  });

  return (
    <section className=''>
      <ul className='grid grid-cols-4 gap-3'>
        {shoes?.map((Shoe: Shoe) => (
          <li key={Shoe.id} className='border rounded'>
            <Image
              src={Shoe.image}
              alt={Shoe.category}
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-auto'
            />
            <div className='flex justify-center text-slate-50 gap-2 p-4'>
              <p>Price: {Shoe.price_range}$</p>
              <p>Color: {Shoe.color}</p>
              <ChooseButton itemId={Shoe.id} category={Shoe.category} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shoes;
