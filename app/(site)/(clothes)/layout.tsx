'use client';

import Header from '@/app/(components)/header';
import Sidebar from '@/app/(components)/sidebar';
import { signOut } from 'next-auth/react';
import router from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

const ClothingContext = createContext<{
  selectedColor: string | null;
  selectedGender: string | null;
}>({
  selectedColor: null,
  selectedGender: null,
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

  const [selectedGender, setSelectedGender] = useState<string | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
    router.push('/login');
  };
  
  return (
    <section>
      <Header onSignOut={handleSignOut} />
      <div className='flex flex-1'>
        <Sidebar
          genders={['Male', 'Female']}
          colors={colorOptions}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <ClothingContext.Provider value={{ selectedColor, selectedGender } }>
          {children}
        </ClothingContext.Provider>
      </div>
    </section>
  );
}
