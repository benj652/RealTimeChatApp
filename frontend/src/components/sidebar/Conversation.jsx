import { useAuthContext } from '../../context/AuthContext';
import { useConversationContext } from '../../context/ConversationContext';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ con, lastIndex }) => {
  //   console.log(con.participants[1]);
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { authUser } = useAuthContext();
  const isGroupChat = con.participants.length > 2;
  const isOnline =
    onlineUsers.includes(con.participants[0]._id) &&
    onlineUsers.includes(con.participants[1]._id) &&
    !isGroupChat;
  const conversationIcon = isGroupChat
    ? null
    : con.participants[0]._id === authUser._id
    ? con.participants[1].profilePic
    : con.participants[0].profilePic;
  const conversationTitle = isGroupChat
    ? con.title
    : con.participants[0]._id === authUser._id
    ? con.participants[1].username
    : con.participants[0].username;
  const isSelected = selectedConversation?._id === con._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 text-white rounded p-2 py-1 cursor-pointer 
        ${isSelected ? 'bg-sky-500 text-white' : ''}`}
        onClick={() => setSelectedConversation(con)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={conversationIcon} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black">{conversationTitle}</p>

            <span className="text-xl text-black">ඞ</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
