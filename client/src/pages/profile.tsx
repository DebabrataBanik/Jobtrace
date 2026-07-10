import { useState, useEffect, type ChangeEvent, type SubmitEvent } from "react";
import type { UserFormData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateProfile,
  uploadProfileImage,
} from "../services/user.service";
import MaleCartoon from "/avatar/3d male cartoon.jpg";

type FormError = Partial<UserFormData>;

export default function Profile() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const [formData, setFormData] = useState<UserFormData>({
    name: data?.name || "",
    about: data?.about || "",
  });
  const [formError, setFormError] = useState<FormError>({});
  const [message, setMessage] = useState<string | null>("");
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(data?.imageUrl || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const queryClient = useQueryClient();
  const profileUpdateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      setIsEditing(false);
    },
    onError: (error) => setMessage(error.message),
  });
  const imageUpdateMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      setPreviewUrl(user.imageUrl);
    },
    onError: (err) => {
      setMessage(err.message);
      setPreviewUrl(data?.imageUrl || "");
    },
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const name = formData.name.trim();
    const about = formData.about.trim();

    const errors: FormError = {};
    if (name.length <= 2) {
      errors.name = "Username must be longer that 2 characters";
    }
    if (about.length >= 500) {
      errors.about = "Cannot exceed 500 characters.";
    }

    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      profileUpdateMutation.mutate({
        name,
        about,
      });
    }
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image is too large (max 5MB).");
      return;
    }
    const localImageUrl = URL.createObjectURL(file);
    setPreviewUrl(localImageUrl);
    imageUpdateMutation.mutate(file, {
      onSuccess: () => URL.revokeObjectURL(localImageUrl),
    });
  }

  return (
    <main className="flex itesm-center justify-center">
      <div className="bg-bg-primary w-3/4 max-w-200 border border-border rounded-md p-10">
        <form noValidate onSubmit={handleSubmit}>
          <div className="group relative w-37.5 aspect-square border border-border rounded-full mb-5 bg-bg-secondary mx-auto overflow-hidden">
            <img
              width={150}
              height={150}
              src={previewUrl ? previewUrl : MaleCartoon}
              alt="profile image"
              className="w-full h-full object-cover"
            />
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs tracking-wide">Change Image</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <span className="block my-4 text-error text-sm text-center">
            {message && message}
          </span>
          <div className="flex items-center justify-between gap-5 mb-5">
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Username</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                type="text"
                disabled={!isEditing}
              />
              <span className="form-error">{formError && formError.name}</span>
            </label>
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Email</span>
              <input
                name="email"
                value={data.email}
                className="input"
                type="email"
                disabled
              />
              <span className="form-error text-text-tertiary">
                {isEditing && "Email cannot be modified"}
              </span>
            </label>
          </div>
          <label className="flex flex-col">
            <span className="ml-1 my-1">About</span>
            <textarea
              value={formData.about}
              onChange={handleChange}
              className={`input max-h-40 overflow-hidden field-sizing-content ${!isEditing ? "resize-none" : ""}`}
              name="about"
              disabled={!isEditing}
            />
            <span className="form-error">{formError && formError.about}</span>
          </label>
          <div className="flex mt-10 mx-2">
            {isEditing && (
              <button
                className="form-btn"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="form-btn ml-auto">
              {isEditing ? "Save Profile" : "Make Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
