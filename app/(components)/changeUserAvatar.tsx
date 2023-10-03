'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export function ChangeAvatar() {
  const [avatarLink, setAvatarLink] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Convert the avatarLink to a JSON string
      const avatarLinkJson = JSON.stringify(avatarLink);
  
      const response = await axios.post('/api/change-avatar', avatarLinkJson, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
  
      if (response.status === 200) {
        toast.success('Avatar changed successfully');
        setAvatarLink('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };
  

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarLink(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text' 
        placeholder='Enter avatar link'
        value={avatarLink}
        onChange={handleLinkChange}
      />
      <button type='submit'>Change Avatar</button>
    </form>
  );
}
