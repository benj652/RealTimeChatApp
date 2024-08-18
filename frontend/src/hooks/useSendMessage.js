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
        const formData = new FormData();
        formData.append('image', message);
        formData.append('users', JSON.stringify(selectedConversation.participants));
        res = await httpClient.post(`/api/messages/send/${selectedConversation._id}`, formData, {
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
      // console.log(data);
      //   console.log(selectedConversation);
      res = null;
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
