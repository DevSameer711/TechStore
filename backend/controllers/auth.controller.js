import User from "../models/user.model.js";

export const handleGoogleOAuthUser = async (profile) => {
  try {
    if (!profile.emails || !profile.emails.length) {
      throw new Error("No email associated with this Google account.");
    }

    const user = await User.findOneAndUpdate(
      { googleId: profile.id },
      {
        $setOnInsert: {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0]?.value,
          address: "",
          phoneNumber: "",
          card: { cardNumber: "", cvv: "", expiryDate: "" },
        },
      },
      { upsert: true, new: true }
    );

    console.log(user.isNew ? "New user created:" : "Existing user found:", user);
    return user;
  } catch (error) {
    console.error("Error handling Google OAuth user:", error);
    throw error;
  }
};

export const updateCheckoutDetails = async (req, res) => {
  const { address, phoneNumber, cardNumber, cvv, expiryDate } = req.body;
  const { userId } = req.params;

  if (!address || !phoneNumber || !cardNumber || !cvv || !expiryDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update checkout details
    user.address = address;
    user.phoneNumber = phoneNumber;
    user.card = { cardNumber, cvv, expiryDate };

    await user.save();

    res.status(200).json({ message: "Checkout details updated successfully." });
  } catch (error) {
    console.error("Error updating checkout details:", error);
    res.status(500).json({ error: "Failed to update checkout details." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    
    // Return users data in the response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};
