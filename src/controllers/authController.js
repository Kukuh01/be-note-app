import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Checking email
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Assign value
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in register", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    // Take value
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function me(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in me", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
