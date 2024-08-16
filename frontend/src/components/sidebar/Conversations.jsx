import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useConversationContext } from '../../context/ConversationContext';
import useListenConversation from '../../hooks/useListenConversations';
import httpClient from '../../utils/httpClient';
import Conversation from './Conversation';

const Conversations = () => {
  const findOtherUser = (conversation, userId) => {
    return conversation.participants.find((p) => p._id !== userId);
  };
  const { authUser } = useAuthContext();

  const apiCallMade = useRef(false);
  const { setConversations } = useConversationContext();
  useEffect(() => {
    if (!apiCallMade.current) {
      const fetchConversations = async () => {
        apiCallMade.current = true;
        const conversations = await httpClient.get(`/api/conversations/getchats/${authUser._id}`);
        setConversations(conversations.data);
        // console.log('made api call');
      };

      fetchConversations();
    }
  }, []);

  useListenConversation();
  const { conversations } = useConversationContext();
  // console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((con, idx) => {
        if (con.participants.length === 2) {
          const otherUser = findOtherUser(con, authUser._id);
          return (
            <Conversation
              key={otherUser._id}
              con={con}
              lastIndex={idx === conversations.length - 1}
            />
          );
        }
        return null;
      })}
      {false && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
