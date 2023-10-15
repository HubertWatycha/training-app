
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
      className={`text-background bg-button p-2 w-42 rounded-xl ${
        isRemoving ? 'opacity-50 pointer-events-none' : ''
      }`}
      onClick={handleRemove}
    >
      {isRemoving ? 'Removing...' : 'Remove'}
    </button>
  );
};

export default RemoveButton;
