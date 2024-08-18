import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext';
import { useSocketContext } from '../context/SocketContext';

const useListenConversation = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, conversations, setConversations, setSelectedConversation } =
    useConversationContext();
  useEffect(() => {
    if (!conversations) getChats();
    socket?.on('newConversation', (newConversation) => {
      // console.log('new conversation', newConversation);
      setConversations([...conversations, newConversation.newConv]);
      if (newConversation.sender) setSelectedConversation(newConversation.newConv);
      else toast.success(`Got new conversation: ${newConversation.newConv.title}`);
    });
    return () => {
      socket?.off('newConversation');
    };
  }, [socket, messages, setMessages, conversations]);
};

export default useListenConversation;
