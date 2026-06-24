import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/applicationService";
import type { Application } from "../types";

export default function Applications() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  if (isError) {
    return <p className="p-4 text-error text-sm">Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-sm">Loading applications...</p>;
  }

  return (
    <div className="rounded-md bg-bg-primary">
      <div className="p-4 border-b border-b-border-subtle shadow-xs">
        <div className="p-1 w-fit rounded-md bg-bg-tertiary flex items-center gap-2">
          <button className="filter-item active">All</button>
          <button className="filter-item">Assessment</button>
          <button className="filter-item">Interview</button>
          <button className="filter-item">Rejected</button>
        </div>
      </div>
      <div className="px-4 py-2 bg-bg-secondary shadow-xs text-sm grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr] place-items-center font-medium">
        <label className="w-5">
          <input type="checkbox" />
        </label>
        <span>Company Name</span>
        <span>Job Title</span>
        <span>Applied Date</span>
        <span>Last updated</span>
        <span>Stage</span>
      </div>
      <div>
        {data?.length ? (
          data.map((application) => (
            <Application key={application._id} appData={application} />
          ))
        ) : (
          <div className="text-sm flex flex-col items-center gap-2">
            <p className="text-base font-medium">No applications to show.</p>
            <span className="text-text-secondary">
              Try adding a new application
            </span>
            <button className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-bg-primary">
              Add application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ApplicationProps {
  appData: Application;
}

function Application({ appData }: ApplicationProps) {
  const { company, title, status } = appData;
  let { appliedDate, updatedAt } = appData;

  appliedDate = new Date(appliedDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  updatedAt = new Date(updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-4 text-sm grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr] place-items-center border-t border-t-border-subtle">
      <label className="w-5">
        <input type="checkbox" />
      </label>
      <span className="font-medium">{company}</span>
      <span>{title}</span>
      <span>{appliedDate}</span>
      <span>{updatedAt}</span>
      <span>{status}</span>
    </div>
  );
}
