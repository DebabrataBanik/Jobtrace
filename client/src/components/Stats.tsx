const STATS = [
  {
    id: "1",
    count: 20,
    label: "Total Applications",
  },
  {
    id: "2",
    count: 5,
    label: "Online Assessment",
  },
  {
    id: "3",
    count: 2,
    label: "Interview",
  },
  {
    id: "4",
    count: 5,
    label: "Rejected",
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <Stat key={stat.id} {...stat} />
      ))}
    </div>
  );
}

const Stat = ({ count, label }: { count: number; label: string }) => {
  return (
    <div className="p-5 bg-bg-primary rounded-lg shadow-md">
      <p className="font-semibold text-2xl">{count}</p>
      <span>{label}</span>
    </div>
  );
};
