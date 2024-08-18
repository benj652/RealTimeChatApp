import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useConversationContext } from '../context/ConversationContext';
import httpClient from '../utils/httpClient';
// import { useConversationsContext } from "../context/ConversationsContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setConversations } = useConversationContext();
  //   const { getAllUsers }= useConversationsContext();
  const login = async (username, password) => {
    const success = handelInputErrors({ username, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await httpClient.post(
        '/api/auth/login',
        {
          username,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error);
    } finally {
      setLoading(false);
      //   getAllUsers();
    }
  };
  return { loading, login };
};

export default useLogin;

function handelInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
}
