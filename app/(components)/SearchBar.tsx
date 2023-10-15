import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    <div className='flex items-center rounded-xl p-2 bg-slate-50 '>
      <AiOutlineSearch size={24} className='text-black' />
      <input
        type='text'
        className='rounded-xl ml-2 p-1 border-0'
        placeholder='Search...'
      />
    </div>
  );
};

export default SearchBar;
