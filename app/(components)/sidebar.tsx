import { useQueryClient } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction } from 'react';

interface SidebarProps {
  sizes: (number | string)[];
  colors: { value: string; name: string }[];
  selectedSize: string | number | null;
  setSelectedSize: Dispatch<SetStateAction<string | number | null>>;
  selectedColor: string | null;
  setSelectedColor: Dispatch<SetStateAction<string | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  sizes,
  colors,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  const queryClient = useQueryClient();

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
    }
  };

  return (
    <div className='flex flex-col p-2 content-center'>
      <div className='mb-4'>
        <h2 className='text-3xl font-semibold mb-2 text-slate-50'>Sizes</h2>
        <div className='space-y-2'>
          {sizes.map((size, index) => (
            <label
              key={index}
              className='flex items-center cursor-pointer text-slate-50'>
              <input
                type='radio'
                name='size'
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className='mr-2'
              />
              {size}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-3xl font-semibold mb-2 text-slate-50'>Colors</h2>
        <select
          value={selectedColor || ''}
          onChange={(e) => handleColorChange(e.target.value)}
          className='w-full p-2 bg-gray-800 border border-gray-700 text-slate-50 rounded-md'>
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
