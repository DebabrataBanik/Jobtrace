import { TrashIcon, SquareArrowOutUpRightIcon, PencilIcon } from "lucide-react";
import type { Application } from "../types";

type ActionMenuProps = {
  data: Application;
};

export default function ActionMenu({ data }: ActionMenuProps) {
  const urlPresent = Boolean(data.url);
  return (
    <div className="absolute z-10 -left-30 rounded-md bg-bg-primary border border-border text-sm flex flex-col w-30">
      <div className="p-1 border-b border-border-subtle flex flex-col items-start gap-1">
        <button
          className="w-full p-1 px-2 rounded-md flex items-center gap-2.5 hover:bg-accent-subtle text-accent"
          disabled={!urlPresent}
        >
          <SquareArrowOutUpRightIcon size={14} />
          Visit Site
        </button>
        <button className="w-full p-1 px-2 rounded-md flex items-center gap-2.5 hover:bg-accent-subtle text-accent">
          <PencilIcon size={14} />
          Update
        </button>
      </div>
      <div className="p-1">
        <button className="w-full text-error text-left hover:bg-error-subtle p-1 px-2 rounded-md flex items-center gap-2.5">
          <TrashIcon size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
