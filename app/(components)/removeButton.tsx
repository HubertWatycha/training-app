
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

interface RemoveButtonProps {
  itemId: number;
  category: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ itemId, category }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const removeItemMutation = useMutation(async () => {
    const response = await axios.post('api/remove', { itemId, category });
    return response.data; 
  }, {
    onSuccess: () => {
      toast.success('Item has been removed!');
    },
    onError: () => {
      toast.error('Failed to remove item.');
    }, 
  });

  const handleRemove = () => {
    setIsRemoving(true);
    removeItemMutation.mutate();
  };

  return (
    <button
      className={`text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ${
        isRemoving ? 'opacity-50 pointer-events-none' : ''
      }`}
      onClick={handleRemove}
    >
      {isRemoving ? 'Removing...' : 'Remove'}
    </button>
  );
};

export default RemoveButton;
