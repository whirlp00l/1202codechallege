import FocusTrap from "focus-trap-react";
import { useEffect } from "react";
import { ModalPortal } from "./ModalPortal";

interface Props {
  toggle: () => void;
  open: boolean;
}

const ModalBody: React.FC = ({ children }) => {
  return (
    <div
      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
    </div>
  );
};

const ModalWrapper: React.FC<{ onClickOutSide: () => void }> = ({
  children,
  onClickOutSide,
}) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClickOutSide();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <FocusTrap>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onClickOutSide}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export const Modal: React.FC<Props> = ({ children, open, toggle }) => {
  return (
    <ModalPortal target={"modal-root"}>
      {open && (
        <ModalWrapper onClickOutSide={toggle}>
          <ModalBody>{children}</ModalBody>
        </ModalWrapper>
      )}
    </ModalPortal>
  );
};
