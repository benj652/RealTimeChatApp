import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMessage = async (req, res) => {
  try {
    const { message, users } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findById(receiverId);
    if (!conversation) {
      // sending to one user
      conversation = await Conversation.create({
        participants: [senderId, users[0]],
      });

      await User.findByIdAndUpdate(users[0], {
        $addToSet: { conversations: conversation._id },
      });
      const receiverSocketId = getReceiverSocketId(users[0]);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newConversation', conversation);
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      imageUrl: image,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);

    for (const user of users) {
      const receiverSocketId = getReceiverSocketId(user);
      console.log(receiverSocketId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (e) {
    console.log('Error in message controller', e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');
    if (!conversation) {
      conversation = await Conversation.findById(userToChatId).populate('messages');
    }
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (e) {
    console.log('Error in get message controler', e.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
