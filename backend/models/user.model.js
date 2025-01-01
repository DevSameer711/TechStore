import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  picture: { type: String },
  address: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  card: {
    cardNumber: { type: String, default: "" },
    cvv: { type: String, default: "" },
    expiryDate: { type: String, default: "" },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
