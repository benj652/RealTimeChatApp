import { useEffect } from 'react';

import { useConversationContext } from '../context/ConversationContext';
import { useSocketContext } from '../context/SocketContext';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationContext();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
