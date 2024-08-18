import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck, FaHome, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import UserAddUI from '../components/other/UserAddUI';
import { useAuthContext } from '../context/AuthContext';
import useCreateGroupChat from '../hooks/useCreateGroupChat';
import useGetAllUsers from '../hooks/useGetAllUsers';

const CreateGroupChatPage = () => {
  const { authUser } = useAuthContext();
  const [curUsers, setCurUsers] = useState([authUser]);
  const [search, setSearch] = useState('');
  const { allUsers } = useGetAllUsers();
  const { loading, createGroupChat } = useCreateGroupChat();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }
    const targetUser = allUsers.find(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.fullname.toLowerCase().includes(search.toLowerCase()),
    );
    if (!targetUser) return toast.error(`no user with "${search}" found`);
    else if (curUsers.includes(targetUser))
      return toast.error(`already selected user "${targetUser.username}"`);
    else {
      setCurUsers((prev) => [...prev, targetUser]);
      setSearch('');
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (curUsers.length < 3) return toast.error('select at least 2 users');
    await createGroupChat({ title, users: curUsers });
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center w-[550px] h-[550px] rounded-3xl bg-gray-300 bg-clip-padding border-gray-500 border-8 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold">Create Group Chat</h1>
      </div>
      <form className="flex items-center gap-2 mx-6 my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add users to groupchat"
          className="input input-bordered rounded-full w-[300px] pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <FaPlus className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="flex flex-col items-center space-y-4 my-4 overflow-auto h-[350px]">
        {curUsers.map((user, idx) => (
          <UserAddUI
            key={user._id}
            curUser={user}
            getCurs={curUsers}
            setCurs={setCurUsers}
            lastIndex={idx === allUsers.length - 1}
          />
        ))}
      </div>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered rounded-full w-[300px] pr-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex items-center justify-center p-6 space-x-4">
        {loading ? (
          <button className="btn btn-circle bg-sky-500 text-white">
            <div className="spinner loading-spinner"></div>
          </button>
        ) : (
          <button className="btn btn-circle bg-sky-500 text-white" onClick={handleCreate}>
            <FaCheck />
          </button>
        )}
        <Link to="/" className="btn btn-circle bg-sky-500 text-white">
          <FaHome className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default CreateGroupChatPage;
