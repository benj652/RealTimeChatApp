import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'passwords do not match' });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const profilePic = `https://robohash.org/${fullname}`; //"https://avatar.iran.liara.run/public";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      profilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullname,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'invalid user data' });
    }
  } catch (e) {
    console.log('error in signup controler', e.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'invalid username or password' });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      profilePic: user.profilePic,
    });
  } catch (e) {
    console.log('error in signup controler', e.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'logged out successfully' });
  } catch (e) {
    console.log('error in signup controler', e.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
