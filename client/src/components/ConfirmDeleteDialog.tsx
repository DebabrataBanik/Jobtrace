import { Trash2Icon } from "lucide-react";
import type { ReactNode } from "react";

type ConfirmDeleteDialogProps = {
  children: ReactNode;
  onClose: () => void;
  onDelete: () => void;
  disabled: boolean;
};

const ConfirmDeleteDialog = ({
  children,
  onClose,
  onDelete,
  disabled,
}: ConfirmDeleteDialogProps) => {
  return (
    <div className="delete-dialog-wrapper">
      <div className="dialog-container">
        <div className="trash">
          <Trash2Icon size={25} />
        </div>

        <h2 className="font-semibold text-center pt-1">Delete Bookmark?</h2>
        <p className="text-sm text-center px-7">{children}</p>

        <div className="btn-container">
          <button onClick={onClose} type="button" className="cancel">
            Cancel
          </button>
          <button
            disabled={disabled}
            onClick={onDelete}
            type="button"
            className="delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
