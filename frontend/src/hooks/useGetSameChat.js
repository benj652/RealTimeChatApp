import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useConversationContext } from '../context/ConversationContext';

const useGetSameChat = () => {
  const [loading, setLoading] = useState(false);
  const { conversations } = useConversationContext();
  const { authUser } = useAuthContext();

  const getSameChat = async ({ targetUserId }) => {
    try {
      setLoading(true);
      const newConversationObject = {
        participants: [targetUserId],
      };
      const targetConversation = conversations.find(
        (conversation) =>
          conversation.participants.length === 2 &&
          conversation.participants.includes(targetUserId) &&
          conversation.participants.includes(authUser._id),
      );
      return targetConversation ? targetConversation : newConversationObject;
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getSameChat };
};

export default useGetSameChat;
