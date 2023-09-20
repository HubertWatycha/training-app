import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Item {
  id: number;
  size: number | string;
  image: string;
  category: string;
  price_range: number;
  color: string;
}

const useFetchDashboard = () =>
  useQuery<Item[], Error>({
    queryKey: ['allClothes'],
    queryFn: () =>
      axios
        .get('api/get/')
        .then((res) => res.data),
    keepPreviousData: true,
  });

export default useFetchDashboard;
