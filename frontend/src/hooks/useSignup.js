import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import httpClient from '../utils/httpClient';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({ fullname, username, password, confirmPassword }) => {
    const success = handelInputErrors({ fullname, username, password, confirmPassword });
    if (!success) return;
    try {
      const res = await httpClient.post(
        '/api/auth/signup',
        {
          fullname,
          username,
          password,
          confirmPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const data = await res.data;
      //   console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handelInputErrors({ fullname, username, password, confirmPassword }) {
  if (!fullname || !username || !password || !confirmPassword) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
}
