
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ChooseButtonProps {
  itemId: number;
  category: string;
}

const ChooseButton: React.FC<ChooseButtonProps> = ({ itemId, category }) => {
  const [isChoosing, setIsChoosing] = useState(false);

  const chooseItemMutation = useMutation(async () => {
    const response = await axios.post('api/choose', { itemId, category });
    return response.data; 
  }, {
    onSuccess: () => {
      toast.success('Item has been chosen!');
    },
    onError: () => {
      toast.error('Failed to choose item.');
    },
  });

  const handleChoose = () => {
    setIsChoosing(true);
    chooseItemMutation.mutate();
  };

  return (
    <button
      className={`text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ${
        isChoosing ? 'opacity-50 pointer-events-none' : ''
      }`}
      onClick={handleChoose}
    >
      {isChoosing ? 'Choosing...' : 'Choose'}
    </button>
  );
};

export default ChooseButton;
