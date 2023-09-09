'use client';

import Header from '@/training-app/app/(components)/header';
import Sidebar from '@/training-app/app/(components)/sidebar';
import React, { createContext, useContext, useState } from 'react';

const ClothingContext = createContext<{
  selectedColor: string | null;
}>({
  selectedColor: null,
});

export const useClothingContext = () => useContext(ClothingContext);

export default function ClothingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorOptions = [
    { value: 'Red', name: 'Red' },
    { value: 'Green', name: 'Green' },
    { value: 'Blue', name: 'Blue' },
    { value: 'Purple', name: 'Purple' },
    { value: 'Light Red', name: 'Light Red' },
    { value: 'Sky Blue', name: 'Sky Blue' },
    { value: 'Yellow', name: 'Yellow' },
    { value: 'Light Green', name: 'Light Green' },
    { value: 'Light Blue', name: 'Light Blue' },
    { value: 'Light Yellow', name: 'Light Yellow' },
    { value: 'Light Cyan', name: 'Light Cyan' },
    { value: 'Magenta', name: 'Magenta' },
    { value: 'Pink', name: 'Pink' },
    { value: 'Lime Green', name: 'Lime Green' },
    { value: 'Black', name: 'Black' },
    { value: 'White', name: 'White' },
    { value: 'Gray', name: 'Gray' },
    { value: 'Brown', name: 'Brown' },
  ];

  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  return (
    <section>
      <Header
        onSignOut={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div className='flex flex-1'>
        <Sidebar
          sizes={['S', 'M', 'L', 'XL']}
          colors={colorOptions}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <ClothingContext.Provider value={{ selectedColor }}>
          {children}
        </ClothingContext.Provider>
      </div>
    </section>
  );
}
