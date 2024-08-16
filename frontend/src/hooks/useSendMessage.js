import { useState } from 'react';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext';
import httpClient from '../utils/httpClient';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationContext();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      let res = null;
      if (message instanceof File) {
        const formdata = new FormData();
        formdata.append('image', message);

        res = await httpClient.post(`/api/messages/send/${selectedConversation._id}`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        res = await httpClient.post(
          `/api/messages/send/${selectedConversation._id}`,

          {
            message,
            users: selectedConversation.participants,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }
      const data = await res.data;
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (e) {
      toast.error(e.messages);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
