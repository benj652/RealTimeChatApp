import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log('error in get users for sidebar function', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const targetId = req.params;
    const id = typeof targetId === 'object' ? targetId.id : targetId;
    const targetUser = await User.findOne({ _id: id }).select('-password');
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(targetUser);
  } catch (e) {
    console.log('error in get user function', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePic = async (req, res) => {
  try {
    const paramId = req.params;
    const id = typeof paramId === 'object' ? paramId.id : paramId;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { profilePic: image }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      _id: updatedUser.id,
      fullName: updatedUser.fullname,
      profilePic: updatedUser.profilePic,
    });
  } catch (e) {
    console.log('error in updating pic', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
