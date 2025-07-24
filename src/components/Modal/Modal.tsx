import { RxCross2 } from "react-icons/rx";
import "./modal.scss";
import { createPortal } from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  onSettingsSave: () => void;
}

export const Modal = ({ children, onClose, onSettingsSave }: ModalProps) => {
  return createPortal(
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContentWrapper" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modalClose" onClick={onClose}>
          <RxCross2 size={34} color="#e77e73ff" />
        </button>
        <button onClick={onSettingsSave} className="settingsSave">
          Save
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
