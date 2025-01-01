// controllers/feedbackController.js
import Feedback from "../models/feedback.model.js";

const saveFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    await newFeedback.save();

    return res.status(201).json({ success: true, message: "Feedback saved successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default saveFeedback;
