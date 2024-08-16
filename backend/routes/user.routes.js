import express from 'express';
import { getAllUsers, getUser, updatePic } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();

router.get('/all', protectRoute, getAllUsers);
router.get('/user/:id', protectRoute, getUser);
router.post('/updatepic/:id', protectRoute, upload.single('image'), updatePic);

export default router;
