import { User } from "../models/user.model.js";
import { RegisterInput } from "../schema/user.schema.js";
import { hashPassword } from "../utils/hashPassword.js";
import ApiError from "../utils/ApiError.js";
import { SignJWT } from "jose";

export async function registerUser(data: RegisterInput){
  const existingUser = await User.findOne({ email: data.email })
  if(existingUser){
    throw new ApiError(400, 'Email already in use')
  }

  const hashedPw = await hashPassword(data.password)
  const newUser = await User.create({
    name: data.username, 
    email: data.email,
    password: hashedPw
  })
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: newUser._id.toString(), role: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
    
  return {
    token, 
    user: { id: newUser._id, name: newUser.name, email: newUser.email }
  }
}