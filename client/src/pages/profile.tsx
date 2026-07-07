import { useState, type ChangeEvent } from "react";
import type { UserFormData } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/authService";

export default function Profile() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const [formData, setFormData] = useState<UserFormData>({
    username: data?.name || "",
    email: data?.email || "",
    about: data?.about || "",
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
  return (
    <main className="flex itesm-center justify-center">
      <div className="bg-bg-primary w-3/4 max-w-200 border border-border rounded-md p-10">
        <form noValidate>
          <div className="w-40 aspect-square border border-border rounded-full mb-10 bg-bg-secondary flex items-center justify-center mx-auto">
            PROFILE IMAGE
          </div>
          <div className="flex items-center justify-between gap-5 mb-5">
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Username</span>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
                type="text"
              />
            </label>
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Email</span>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
                type="email"
              />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="ml-1 my-1">About</span>
            <textarea
              value={formData.about}
              onChange={handleChange}
              className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary max-h-40"
              name="about"
            />
          </label>
          <div className="flex mt-10 mx-2">
            <button className="form-btn ml-auto">Save Profile</button>
          </div>
        </form>
      </div>
    </main>
  );
}
