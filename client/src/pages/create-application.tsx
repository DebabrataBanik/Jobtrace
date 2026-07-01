import { useState, type ChangeEvent } from "react";
import type { ApplicationData } from "../types";
import { useNavigate } from "react-router";

export default function CreateApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApplicationData>({
    company: "",
    title: "",
    url: "",
    appliedDate: "",
    status: "applied",
    description: "",
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
    <main className="flex items-center justify-center">
      <div className="bg-bg-primary w-3/4 max-w-200 border border-border rounded-md p-10">
        <h2 className="font-medium text-2xl tracking-wide">
          Enter your application details
        </h2>
        <form noValidate>
          <div className="my-5 flex items-center justify-between gap-5">
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Company Name</span>
              <input
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
            </label>
            <label className="flex flex-col w-1/2">
              <span className="ml-1 my-1">Job Title</span>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
            </label>
          </div>
          <div className="my-5 flex items-center gap-5">
            <label className="flex flex-col w-2/3">
              <span className="ml-1 my-1">Application link</span>
              <input
                name="url"
                type="text"
                value={formData.url}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
            </label>
            <label className="flex flex-col w-1/3">
              <span className="ml-1 my-1">Date of Apply</span>
              <input
                name="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
            </label>
          </div>
          <div className="my-5 flex flex-col">
            <span className="ml-1 mb-1">Status</span>
            <div className="w-full flex items-center gap-5">
              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-btn"
                  name="status"
                  value="applied"
                  onChange={handleChange}
                  checked={formData.status === "applied"}
                />
                <span>Applied</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-btn"
                  name="status"
                  value="assessment"
                  onChange={handleChange}
                  checked={formData.status === "assessment"}
                />
                <span>Assessment</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-btn"
                  name="status"
                  value="interview"
                  onChange={handleChange}
                  checked={formData.status === "interview"}
                />
                <span>Interview</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-btn"
                  name="status"
                  value="offer"
                  onChange={handleChange}
                  checked={formData.status === "offer"}
                />
                <span>Offer</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-btn"
                  name="status"
                  value="rejected"
                  onChange={handleChange}
                  checked={formData.status === "rejected"}
                />
                <span>Rejected</span>
              </label>
            </div>
          </div>
          <label className="flex flex-col">
            <span className="ml-1 my-1">Job Description</span>
            <textarea
              value={formData.description}
              onChange={handleChange}
              className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary max-h-40"
              name="description"
            />
          </label>
          <div className="mt-10 px-1 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/", { replace: true })}
              className="p-2 px-3 text-sm bg-accent rounded-md text-accent-subtle hover:bg-accent-hover"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="p-2 px-3 text-sm bg-accent rounded-md text-accent-subtle hover:bg-accent-hover"
            >
              Create Application
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
