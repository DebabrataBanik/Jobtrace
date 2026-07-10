import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { UserFormData } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../services/user.service";

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
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();
  const profileUpdateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
    },
    onError: (error) => setMessage(error.message),
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
    const name = formData.name.trim();
    const about = formData.about.trim();

    const errors: FormError = {};
    if (name.length < 2) {
      errors.name = "Username must be longer that 2 characters";
    }
    if (about.length >= 500) {
      errors.about = "Cannot exceed 500 characters.";
    }

    setFormError(formError);

    if (Object.keys(errors).length === 0) {
      profileUpdateMutation.mutate({
        name,
        about,
      });
    }
  }
  return (
    <main className="flex itesm-center justify-center">
      <div className="bg-bg-primary w-3/4 max-w-200 border border-border rounded-md p-10">
        <form noValidate onSubmit={handleSubmit}>
          <div className="w-40 aspect-square border border-border rounded-full mb-5 bg-bg-secondary flex items-center justify-center mx-auto">
            PROFILE IMAGE
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
                readOnly
              />
              <span className="text-xs ml-1 text-text-tertiary">
                Email cannot be modified
              </span>
            </label>
          </div>
          <label className="flex flex-col">
            <span className="ml-1 my-1">About</span>
            <textarea
              value={formData.about}
              onChange={handleChange}
              className="input max-h-40"
              name="about"
            />
            <span className="form-error">{formError && formError.about}</span>
          </label>
          <div className="flex mt-10 mx-2">
            <button type="submit" className="form-btn ml-auto">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
