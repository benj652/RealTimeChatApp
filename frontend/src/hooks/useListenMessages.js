import { useEffect } from 'react';

import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext';
import { useSocketContext } from '../context/SocketContext';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversationContext();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      if (newMessage.imageUrl) {
        toast.success('Got new image!');
      } else {
        toast.success(`Got new message: ${newMessage.message}`);
      }
      //   console.log(newMessage.imageUrl);
      //   console.log(selectedConversation);
      if (selectedConversation._id === newMessage.receiverId) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
