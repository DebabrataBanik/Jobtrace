import Applications from "./Applications";
import Stats from "./Stats";

export default function Feed() {
  return (
    <main className="flex flex-col gap-5">
      <Stats />
      <Applications />
    </main>
  );
}
