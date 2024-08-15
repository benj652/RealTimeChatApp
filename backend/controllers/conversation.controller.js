import Conversation from '../models/conversation.model.js';
import User from '../models/user.model.js';
import { io } from '../socket/socket.js';

export const getConversationsForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await User.findById(userId).conversations;
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
    const { users } = req.body;
    const newConversation = new Conversation({
      participants: users,
    });
    for (const user of users) {
      await User.findByIdAndUpdate(user, {
        $addToSet: { conversations: newConversation._id },
      });
      const receiverSocketId = getReceiverSocketId(user);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newGroupChat', newConversation._id);
      }
    }

    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (e) {
    console.log('error in create group chat function', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
