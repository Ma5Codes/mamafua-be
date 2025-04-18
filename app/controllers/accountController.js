import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/ApiError.js';
import isEmailValid from '../../utils/emailValidation.js';
import { Accounts } from '../models/accounts.js';

dotenv.config();

export const login = async (req, res) => {
  
  try {
    const { email = '', password = '' } = req.body;
    console.log('Login attempt email:', `"${email}"`);

    const user = await Accounts.findOne({ where: { email: email.trim() } });
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "Email not registered." });
    }    

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError(400, 'Incorrect password.');

    // Generate token for user
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    res.status(200).json({
      message: 'Login successful.',
      token,
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    const { email, noTelp, name, address, password, nik } = req.body;
    if (!email || !password || !name || !noTelp) {
      throw new ApiError(400, 'All fields are required.');
    }
    if (!isEmailValid(email)) throw new ApiError(400, 'Invalid email.');
    if (password.length < 8) throw new ApiError(400, 'Password must be at least 8 characters.');

    const existingUser = await Accounts.findOne({ where: { email } });
    if (existingUser) throw new ApiError(400, 'Email already registered.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await Accounts.create({
      nik,
      password: hashedPassword,
      name,
      address,
      role: 'user',
      noTelp,
      email,
    });

    // Generate token for user
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    res.status(201).json({
      message: 'Registration successful',
      token,
      data: user,
    });
    console.log('Received body:', req.body);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};


export const info = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Successfully retrieved data.',
      data: req.user || {},
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
