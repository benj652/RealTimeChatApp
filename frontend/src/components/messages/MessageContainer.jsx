import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useConversationContext } from '../../context/ConversationContext';
import MessageInput from './MessageInput';
import Messages from './Messages';
import NoChatSelected from './NoChatSelected';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { authUser } = useAuthContext();
  const otherParticipates = selectedConversation?.participants
    .filter((participant) => participant._id !== authUser._id)
    .map((participant) => participant.username)
    .join(', ');
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[930px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">{selectedConversation.title}:</span>
            <span className="label-text">{otherParticipates}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
