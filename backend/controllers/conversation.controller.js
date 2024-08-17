import Conversation from '../models/conversation.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const getConversationsForUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findById(userId);
    const conversations = user.conversations;
    const fullConversations = await Conversation.find({ _id: { $in: conversations } })
      .populate('participants', 'username profilePic')
      .populate('messages');

    res.status(200).json(fullConversations);
  } catch (e) {
    console.log('error in get conversatsions for user function', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createGroupChatConversation = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { title, users } = req.body;
    const newConversation = new Conversation({
      title,
      participants: users,
    });
    await newConversation.save();

    const fullConversations = await Conversation.findById(newConversation._id)
      .populate('participants', 'username profilePic')
      .populate('messages');
    console.log(users);
    for (const user of users) {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { conversations: newConversation._id },
      });
      const receiverSocketId = getReceiverSocketId(user._id);
      // console.log(senderId, user._id);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newConversation', {
          newConv: fullConversations,
          sender: senderId.toString() === user._id,
        });
      }
    }

    res.status(201).json(fullConversations);
  } catch (e) {
    console.log('error in create group chat function', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
