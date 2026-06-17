import { User } from '../models/user.model.js';
import { LoginInput, RegisterInput } from '../schema/auth.schema.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export async function registerUser(data: RegisterInput) {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new ApiError(409, 'Email already in use');
  }

  const hashedPw = await bcrypt.hash(data.password, 10);
  const newUser = await User.create({
    name: data.username,
    email: data.email,
    password: hashedPw,
  });

  const token = await generateToken(newUser._id.toString());

  return {
    token,
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  };
}

export async function loginUser(data: LoginInput) {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPwCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPwCorrect) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = await generateToken(user._id.toString());

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

export async function findUser(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, 'User not found');
  }
  return { id: user._id, name: user.name, email: user.email };
}
