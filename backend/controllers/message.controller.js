import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMessage = async (req, res) => {
  try {
    const { message, users } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const { id: receiverId } = req.params;
    // console.log(receiverId);
    const senderId = req.user._id;
    // console.log(senderId, users[0]);
    let conversation;
    if (receiverId !== 'undefined') {
      //   console.log('receiverId', receiverId);
      conversation = await Conversation.findById(receiverId);
    } else {
      // sending to one user and new conversation
      const newConversationRecieverId = users[0];
      const reciever = await User.findById(newConversationRecieverId); //prob can make more effiecent
      conversation = await Conversation.create({
        title: reciever.fullname,
        participants: [senderId, newConversationRecieverId],
      });
      await User.findByIdAndUpdate(newConversationRecieverId, {
        $addToSet: { conversations: conversation._id },
      });
      await User.findByIdAndUpdate(senderId, {
        $addToSet: { conversations: conversation._id },
      });
      const receiverSocketId = getReceiverSocketId(senderId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newConversation', conversation);
      }

      const receiverSocketId2 = getReceiverSocketId(newConversationRecieverId);
      if (receiverSocketId2) {
        io.to(receiverSocketId2).emit('newConversation', conversation);
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId: conversation._id,
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
      //   console.log(receiverSocketId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }
    }

    conversation = null;
    res.status(201).json(newMessage);
  } catch (e) {
    console.log('Error in message controller', e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: curConversationId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findById({
      curConversationId,
    }).populate('messages');
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (e) {
    console.log('Error in get message controler', e.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
