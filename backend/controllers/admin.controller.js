import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AdminController = {

  createAdmin: async (req, res) => {
    try {
      const newAdmin = await Admin.create(req.body);
      res.json(newAdmin);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ messages: errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  },
 
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const foundAdmin = await Admin.findOne({ email });
      if (!foundAdmin) {
        return res.status(400).json({ messages: ["Invalid admin credentials"] });
      }

      const isMatch = await bcrypt.compare(password, foundAdmin.password);
      if (!isMatch) {
        return res.status(400).json({ messages: ["Invalid admin credentials"] });
      }

      const token = jwt.sign({ id: foundAdmin._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ admin: foundAdmin, token });
    } catch {
      console.log(error);
      res.status(500).json({ messages: "Server error" });
    }
  },

};
