import { useQueryClient } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  genders: string[];
  colors: { value: string; name: string }[];
  selectedGender: string | null;
  setSelectedGender: Dispatch<SetStateAction<string | null>>;
  selectedColor: string | null;
  setSelectedColor: Dispatch<SetStateAction<string | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  genders,
  colors,
  selectedGender,
  setSelectedGender,
  selectedColor,
  setSelectedColor,
}) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const color = searchParams.get('color');
    const gender = searchParams.get('gender');
    setSelectedColor(color);
    setSelectedGender(gender);
  }, [searchParams, setSelectedColor, setSelectedGender]);

  const handleColorChange = (color: string) => {
    if (color !== null) {
      console.log('Selected Color:', color);
      setSelectedColor(color);

      const queryKey = [selectedColor];

      queryClient.invalidateQueries(queryKey);

      queryClient.removeQueries(queryKey, {
        exact: true,
        predicate: (query) => {
          const queryColor = query.queryKey[0];
          return !!queryColor && queryColor !== color;
        },
      });
      const newSearchParams = new URLSearchParams();
      if (selectedGender) {
        newSearchParams.set('gender', selectedGender);
      }
      newSearchParams.set('color', color);

      router.push(`?${newSearchParams.toString()}`);
    }
  };

  const handleGenderChange = (gender: string) => {
    if (gender !== null) {
      console.log('Selected Color:', gender);
      setSelectedGender(gender);

      const queryKey = [selectedGender];

      queryClient.invalidateQueries(queryKey);

      queryClient.removeQueries(queryKey, {
        exact: true,
        predicate: (query) => {
          const queryGender = query.queryKey[0];
          return !!queryGender && queryGender !== gender;
        },
      });
      const newSearchParams = new URLSearchParams();
      if (selectedColor) {
        newSearchParams.set('color', selectedColor);
      }
      newSearchParams.set('gender', gender);

      router.push(`?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className='flex flex-col p-2 content-center bg-background my-3 mr-3'>
      <div className='mb-4'>
        <h2 className='font-bold mb-2 text-text'>Gender</h2>
        <div className='space-y-2'>
          {genders.map((gender, index) => (
            <label
              key={index}
              className='flex items-center cursor-pointer text-slate-50'>
              <input
                type='radio'
                name='size'
                value={gender || ''}
                checked={selectedGender === gender}
                onChange={(e) => handleGenderChange(e.target.value)}
                className='mr-2'
              />
              {gender}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className='font-bold mb-2 text-text'>Colors</h2>
        <select
          value={selectedColor || ''}
          onChange={(e) => handleColorChange(e.target.value)}
          className='w-full p-2 bg-gray-800 border border-gray-700 text-text rounded-md'>
          <option value=''>Select a color</option>
          {colors.map((colorOption, index) => (
            <option key={index} value={colorOption.value}>
              {colorOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
