import Applications from "../components/Applications";
import Stats from "../components/Stats";

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-5">
      <Stats />
      <Applications />
    </main>
  );
}
