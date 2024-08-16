import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearchSharp } from 'react-icons/io5';
import { useConversationContext } from '../../context/ConversationContext';
import useGetAllUsers from '../../hooks/useGetAllUsers';
import useGetSameChat from '../../hooks/useGetSameChat';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { allUsers } = useGetAllUsers();
  const { setSelectedConversation } = useConversationContext();
  const { getSameChat } = useGetSameChat();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }
    const targetUser = allUsers.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase()),
    );
    if (targetUser) {
      const mutual = await getSameChat({ targetUserId: targetUser._id });
      setSelectedConversation(mutual);
      setSearch('');
    } else toast.error(`no user with "${search}" found`);
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className="input input-boardered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
