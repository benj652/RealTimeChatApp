import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
