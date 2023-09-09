import { BiErrorAlt } from 'react-icons/bi';

const NoItems = () => {
  return (
    <div className="text-slate-50 flex flex-col items-center justify-center vh-80">
      <div className="mt-2 font-bold text-3xl">
        No items selected yet
      </div>
      <BiErrorAlt className="w-20 h-20 mt-4" />
      <div className="mt-2 font-bold text-3xl">
        Once you select a piece of attire, it will get displayed in here
      </div>
    </div>
  );
};

export default NoItems;