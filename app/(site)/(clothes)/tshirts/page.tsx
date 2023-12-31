'use client';

import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ChooseButton from '@/app/(components)/chooseButton';
import { useQuery } from '@tanstack/react-query';
import { useClothingContext } from '../layout';
import toast from 'react-hot-toast';

interface TShirt {
  id: number;
  size: string;
  gender: string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}

const TShirts = () => {
  const { selectedColor, selectedGender } = useClothingContext();

  const { data: session } = useSession();
  console.log('useSession Hook session object', session);

  const { data: tshirts } = useQuery({
    queryKey: ['tshirts', selectedColor, selectedGender],
    queryFn: async () => {
      const response = await axios.get('api/tshirts/');
      if (!Array.isArray(response.data)) {
        return [];
      }

      const filteredTShirts = response.data.filter((TShirt: TShirt) => {
        const colorMatch = !selectedColor || TShirt.color === selectedColor;
        const genderMatch = !selectedGender || TShirt.gender === selectedGender;
        return colorMatch && genderMatch;
      });
      toast.success('Filtered');
      return filteredTShirts;
    },
    staleTime: 0,
  });

  return (
    <section className=''>
      <ul className='grid grid-cols-4 gap-3'>
        {tshirts?.map((TShirt: TShirt) => (
          <li key={TShirt.id} className='border rounded'>
            <Image
              src={TShirt.image}
              alt={TShirt.category}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
            <div className='flex justify-center text-slate-50 gap-2 p-4'>
              <p>Price: {TShirt.price_range}$</p>
              <p>Color: {TShirt.color}</p>
              <ChooseButton itemId={TShirt.id} category={TShirt.category} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TShirts;
