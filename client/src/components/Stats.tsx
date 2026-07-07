import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../services/application.service";

export default function Stats() {
  const {
    data: stats,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
    select: (apps) => ({
      total: apps.length,
      assessment: apps.filter((a) => a.status === "OA").length,
      interview: apps.filter((a) => a.status === "Interview").length,
      rejected: apps.filter((a) => a.status === "Rejected").length,
    }),
  });

  if (isError) {
    return <p className="text-error text-sm">Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p className="text-sm">Loading stats...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat count={stats?.total ?? 0} label="Total" />
      <Stat count={stats?.assessment ?? 0} label="Assessment" />
      <Stat count={stats?.interview ?? 0} label="Interview" />
      <Stat count={stats?.rejected ?? 0} label="Rejected" />
    </div>
  );
}

const Stat = ({
  count,
  label,
}: {
  count: number | undefined;
  label: string;
}) => {
  return (
    <div className="p-5 bg-bg-primary rounded-lg shadow-md">
      <p className="font-semibold text-2xl">{count}</p>
      <span>{label}</span>
    </div>
  );
};
