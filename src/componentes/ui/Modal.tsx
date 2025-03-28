import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  show: boolean;
  onClose: () => void;
}

export function Modal({ title, show, onClose, children }: Props) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex={-1}
        onClick={onClose}
      >
        <div
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
