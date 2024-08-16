import { useAuthContext } from '../../context/AuthContext';
import { useConversationContext } from '../../context/ConversationContext';
import useGetConversations from '../../hooks/useGetConversations';
import useListenConversation from '../../hooks/useListenConversations';
import Conversation from './Conversation';

const Conversations = () => {
  const findOtherUser = (conversation, userId) => {
    return conversation.participants.find((p) => p._id !== userId);
  };
  const { authUser } = useAuthContext();

  const { loading } = useGetConversations();

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
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
