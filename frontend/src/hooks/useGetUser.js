import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import httpClient from '../utils/httpClient';

const useGetUser = (id) => {
  const [loading, setLoading] = useState(false);
  const apiCallMade = useRef(false);
  const [user, setUser] = useState();
  useEffect(() => {
    if (!apiCallMade.current) {
      setLoading(true);
      try {
        const getUser = async (id) => {
          apiCallMade.current = true;
          const res = await httpClient.get(`/api/users/user/${id}`);
          const data = await res.data;
          setUser(data);
        };
        getUser(id);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  return { user, loading };
};
export default useGetUser;
