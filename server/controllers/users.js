import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/userModel.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong, ${err}` });
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const oldUserEmail = await UserModal.findOne({ email });
    const oldUserName = await UserModal.findOne({ username });

    if (oldUserEmail || oldUserName)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong, ${err}` });

    console.error(error);
  }
};
