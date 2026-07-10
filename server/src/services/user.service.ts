import { User } from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { type UpdateProfileInput } from '../schema/user.schema.js';

export async function getUserProfileData(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    about: user.about,
    imageUrl: user.imageUrl,
  };
}

export async function updateProfileData(userId: string, data: UpdateProfileInput) {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: data },
    { returnDocument: 'after', runValidators: true },
  );
  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }

  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    about: updatedUser.about,
    imageUrl: updatedUser.imageUrl,
  };
}

