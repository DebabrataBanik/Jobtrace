import { TrashIcon, SquareArrowOutUpRightIcon, PencilIcon } from "lucide-react";
import type { Application } from "../types";
import { useNavigate } from "react-router";

type ActionMenuProps = {
  data: Application;
  onDeleteClick: () => void;
  onVisit: (url: string) => void;
};

export default function ActionMenu({
  data,
  onDeleteClick,
  onVisit,
}: ActionMenuProps) {
  const urlPresent = Boolean(data.url);
  const navigate = useNavigate();
  return (
    <div className="absolute z-10 -left-30 rounded-md bg-bg-primary border border-border text-sm flex flex-col w-30">
      <div className="p-1 border-b border-border-subtle flex flex-col items-start gap-1">
        <button
          className="w-full p-1 px-2 rounded-md flex items-center gap-2.5 hover:bg-accent-subtle text-accent"
          onClick={() => {
            if (data.url) onVisit(data.url);
          }}
          disabled={!urlPresent}
        >
          <SquareArrowOutUpRightIcon size={14} />
          Visit Site
        </button>
        <button
          className="w-full p-1 px-2 rounded-md flex items-center gap-2.5 hover:bg-accent-subtle text-accent"
          onClick={() => navigate(`/${data._id}/edit`)}
        >
          <PencilIcon size={14} />
          Edit
        </button>
      </div>
      <div className="p-1">
        <button
          onClick={onDeleteClick}
          className="w-full text-error text-left hover:bg-error-subtle p-1 px-2 rounded-md flex items-center gap-2.5"
        >
          <TrashIcon size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
