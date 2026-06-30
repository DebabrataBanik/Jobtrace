import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { LoginUserData } from "../types";
import { loginUser } from "../services/authService";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type FormError = Partial<LoginUserData>;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginUserData>({
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

  async function login(loginData: LoginUserData) {
    try {
      setLoading(true);
      await loginUser(loginData);
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
    const { email, password } = formData;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 4) {
      error.password = "Password cant be this short";
    }
    setFormError(error);

    if (Object.values(error).length === 0) {
      await login({ email: email.trim(), password });
      setFormData({
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-10 text-center text-sm">
          Don't have an account?
          <button
            onClick={() => navigate("/register", { replace: true })}
            className="px-1 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
