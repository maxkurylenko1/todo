import "./settings.scss";
import { Modal } from "../../components/Modal/Modal";

interface SettingsProps {
  closeModal: () => void;
  handleSaveSettings: () => void;
}

export const Settings = ({ closeModal, handleSaveSettings }: SettingsProps) => {
  return (
    <Modal onClose={closeModal} onSave={handleSaveSettings}>
      <div className="modalContent">
        <h2>ToDo Settings</h2>
        <ul>
          <li>
            Title <input className="checkbox" type="checkbox" name="isTitleOn" />
          </li>
          <li>
            Due date <input className="checkbox" type="checkbox" name="isDueDateOn" />
          </li>
          <li>
            Priority <input className="checkbox" type="checkbox" name="isPriorityOn" />
          </li>
        </ul>
      </div>
    </Modal>
  );
};
