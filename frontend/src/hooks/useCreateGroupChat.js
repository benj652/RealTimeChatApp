import { useState } from 'react';
import toast from 'react-hot-toast';
import httpClient from '../utils/httpClient';
const useCreateGroupChat = () => {
  const [loading, setLoading] = useState(false);
  const createGroupChat = async ({ title, users }) => {
    try {
      setLoading(true);
      const res = await httpClient.post('/api/conversations/makechat', { title, users });
      const data = await res.data;
      if (data.error) throw new Error(data.error);
      toast.success('Group chat created successfully');
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createGroupChat };
};

export default useCreateGroupChat;
