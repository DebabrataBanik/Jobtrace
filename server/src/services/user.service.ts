import { User } from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { type UpdateProfileInput } from '../schema/user.schema.js';
import cloudinary from '../config/cloudinary.js';
import { fileTypeFromBuffer } from 'file-type';

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

export async function updateProfileImage(userId: string, fileBuffer: Buffer) {
  const realType = await fileTypeFromBuffer(fileBuffer);
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!realType || !allowed.includes(realType.mime)) {
    throw new ApiError(400, 'File is not a valid image');
  }
  const base64Image = `data:${realType.mime};base64,${fileBuffer.toString('base64')}`;

  const uploadResult = await cloudinary.uploader.upload(base64Image, {
    folder: 'jobtrace/avatars',
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { imageUrl: uploadResult.secure_url } },
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
