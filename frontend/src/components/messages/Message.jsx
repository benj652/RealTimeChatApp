import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useConversationContext } from '../../context/ConversationContext';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.participants.find((p) => p._id === message.senderId)?.profilePic;
  // console.log(
  //   message,
  //   selectedConversation,
  //   selectedConversation.participants.find((p) => p._id === message.senderId),
  // );
  // selectedConversation.participants.find((p) => p._id === message.senderId).profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const formatedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : '';
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Link to={fromMe ? `/profile/${authUser._id}` : `/profile/${message.senderId}`}>
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </Link>
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message ? (
          message.message
        ) : (
          <img className="max-h-48 max-w-72 m-2" src={`../../..${message.imageUrl}`} />
        )}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
