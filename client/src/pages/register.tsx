import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { RegisterUserData } from "../types";
import { registerUser } from "../services/auth.service";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type FormError = Partial<RegisterUserData>;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterUserData>({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormError>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormError((prevError) => ({
      ...prevError,
      [name]: null,
    }));
  }

  async function register(registerData: RegisterUserData) {
    try {
      setLoading(true);
      await registerUser(registerData);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        const isNetworkError =
          error instanceof TypeError && error.message.includes("fetch");
        setMessage(
          isNetworkError
            ? "Couldn't connect to server. Please try again later."
            : error.message,
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const error: FormError = {};
    const { name, email, password } = formData;

    if (name.trim().length === 0) {
      error.name = "Please enter a username";
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 4) {
      error.password = "Please enter strong password";
    }
    setFormError(error);

    if (Object.values(error).length === 0) {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-xl font-semibold tracking-wide text-center leading-none">
          Welcome to Jobtrace!
        </h1>
        <p className="text-text-tertiary text-center text-sm">
          Manage your job applications
        </p>

        <p className="text-sm text-error text-center mt-4 w-80 h-10 px-2">
          {message && message}
        </p>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-2"
        >
          <label>
            <span className="pl-1 text-sm">Username</span>
            <input
              type="text"
              name="username"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            <span className="form-error">{formError && formError.name}</span>
          </label>
          <label>
            <span className="pl-1 text-sm">Email Address</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            <span className="form-error">{formError && formError.email}</span>
          </label>
          <label>
            <span className="pl-1 text-sm">Password</span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={4}
              className="form-input"
            />
            <span className="form-error">
              {formError && formError.password}
            </span>
          </label>
          <button
            className="w-full bg-accent p-1.5 rounded-sm mt-5 text-bg-primary focus:outline-accent focus:outline-offset-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-10 text-center text-sm">
          Already have an account?
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="px-1 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
