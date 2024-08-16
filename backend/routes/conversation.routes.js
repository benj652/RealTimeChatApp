import express from 'express';
import {
  createGroupChatConversation,
  getConversationsForUser,
} from '../controllers/conversation.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/getchats/:id', protectRoute, getConversationsForUser);
router.post('/makechat', protectRoute, createGroupChatConversation);

export default router;
