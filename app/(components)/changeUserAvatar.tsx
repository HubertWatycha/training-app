import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export function ChangeAvatar() {
  const [avatarLink, setAvatarLink] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const requestData = avatarFile ? { avatar: avatarFile } : { avatarLink: avatarLink };
  
      const response = await axios.post('/api/change-avatar', requestData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (response.status === 200) {
        toast.success('Avatar changed successfully');
        setAvatarLink('');
        setAvatarFile(null);
        closeModal();
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };;
  

  const handleLinkChange = (e: { target: { value: string }; }) => {
    setAvatarLink(e.target.value);
  };
  

  const handleFileChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    setAvatarFile(file);

  };


  return {
    isModalOpen,
    openModal,
    closeModal,
    onSubmit,
    avatarLink,
    handleLinkChange,
    handleFileChange,
  };
}


