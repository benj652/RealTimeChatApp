import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext';
import httpClient from '../utils/httpClient';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversationContext();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await httpClient.get(`/api/messages/${selectedConversation._id}`);
        const data = await res.data;
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation]);
  return { messages, loading };
};

export default useGetMessages;
