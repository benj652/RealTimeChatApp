import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import httpClient from '../utils/httpClient';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await httpClient.post('/api/auth/logout');
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (e) {
      toast.error(e.mesage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
