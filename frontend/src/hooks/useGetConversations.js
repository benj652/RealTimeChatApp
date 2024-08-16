import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useConversationContext } from '../context/ConversationContext';
import httpClient from '../utils/httpClient';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const apiCallMade = useRef(false);
  const { setConversations } = useConversationContext();
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (!apiCallMade.current) {
      try {
        setLoading(true);

        const fetchConversations = async () => {
          apiCallMade.current = true;
          const conversations = await httpClient.get(`/api/conversations/getchats/${authUser._id}`);
          const data = await conversations.data;
          setConversations(data);
          // console.log('made api call');
        };
        fetchConversations();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  }, []);
  return { loading };
};

export default useGetConversations;
