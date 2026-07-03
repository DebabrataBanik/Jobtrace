import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { ApplicationFormData } from "../types";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  getApplication,
} from "../services/applicationService";
import validator from "validator";

type FormError = Partial<ApplicationFormData>;
type ApplicationFormProps = {
  mode: "create" | "edit";
};

export default function ApplicationForm({ mode }: ApplicationFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(id!),
    enabled: mode === "edit",
  });
  const [formData, setFormData] = useState<ApplicationFormData>({
    company: data?.company || "",
    title: data?.title || "",
    url: data?.url || "",
    appliedDate: data?.appliedDate.split("T")[0] || "",
    status: data?.status || "Applied",
    description: data?.description || "",
  });
  const [error, setError] = useState<FormError>({});
  const [message, setMessage] = useState<string | null>(null);

  const addApplicationMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => handleSuccessMutation(),
    onError: (error) => {
      setMessage(error.message);
    },
  });

  function handleSuccessMutation() {
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    setFormData({
      company: "",
      title: "",
      url: "",
      appliedDate: "",
      status: "Applied",
      description: "",
    });
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: null,
    }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const company = formData.company.trim();
    const title = formData.title.trim();
    const { status, appliedDate, url, description } = formData;

    const errors: FormError = {};
    if (company.length < 2) {
      errors.company = "Please enter valid company name";
    }
    if (title.length === 0) {
      errors.title = "Please enter job title";
    }
    if (appliedDate.length === 0 || !validator.isDate(appliedDate)) {
      errors.appliedDate = "Please enter application date";
    }
    if (url?.trim() && !validator.isURL(url)) {
      errors.url = "Please enter valid url";
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      addApplicationMutation.mutate({
        company,
        title,
        url: url?.trim() || undefined,
        appliedDate,
        status,
        description: description.trim(),
      });
    }
  }

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  return (
    <main className="flex items-center justify-center">
      <div className="bg-bg-primary w-3/4 max-w-200 border border-border rounded-md p-10">
        <h2 className="font-medium text-2xl tracking-wide">
          Enter your application details
        </h2>
        <p className="text-center text-sm my-2 text-error">
          {message && message}
        </p>
        <form noValidate onSubmit={handleSubmit}>
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
              <span className="form-error">{error && error.company}</span>
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
              <span className="form-error">{error && error.title}</span>
            </label>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex flex-col w-3/5">
              <span className="ml-1 my-1">Application link</span>
              <input
                name="url"
                type="text"
                value={formData.url}
                onChange={handleChange}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
              <span className="form-error">{error && error.url}</span>
            </label>
            <label className="flex flex-col w-2/5">
              <span className="ml-1 my-1">Date of Apply</span>
              <input
                name="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={handleChange}
                max={maxDate}
                className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary"
              />
              <span className="form-error">{error && error.appliedDate}</span>
            </label>
          </div>
          {mode === "create" ? (
            <div className="my-5">
              <span className="ml-1 mb-1 block">Status</span>
              <span className="radio-label border-accent bg-accent-subtle text-accent inline-block">
                Applied
              </span>
            </div>
          ) : (
            mode === "edit" && (
              <div className="my-5 flex flex-col">
                <span className="ml-1 mb-1">Status</span>
                <div className="w-full flex items-center gap-5">
                  <label className="radio-label">
                    <input
                      type="radio"
                      className="radio-btn"
                      name="status"
                      value="OA"
                      onChange={handleChange}
                      checked={formData.status === "OA"}
                    />
                    <span>Assessment</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      className="radio-btn"
                      name="status"
                      value="Interview"
                      onChange={handleChange}
                      checked={formData.status === "Interview"}
                    />
                    <span>Interview</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      className="radio-btn"
                      name="status"
                      value="Offer"
                      onChange={handleChange}
                      checked={formData.status === "Offer"}
                    />
                    <span>Offer</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      className="radio-btn"
                      name="status"
                      value="Rejected"
                      onChange={handleChange}
                      checked={formData.status === "Rejected"}
                    />
                    <span>Rejected</span>
                  </label>
                </div>
              </div>
            )
          )}

          <label className="flex flex-col">
            <span className="ml-1 my-1">Job Description</span>
            <textarea
              value={formData.description}
              onChange={handleChange}
              className="px-2 py-1 border border-border-subtle rounded-md focus:outline focus:outline-text-tertiary max-h-30"
              name="description"
            />
            <span className="form-error">{error && error.description}</span>
          </label>
          <div className="mt-5 px-1 flex items-center justify-between">
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
              {mode === "create"
                ? "Create Application"
                : mode === "edit" && "Update Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
