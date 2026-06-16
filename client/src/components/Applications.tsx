export default function Applications() {
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
      <div className="p-4"></div>
    </div>
  );
}
