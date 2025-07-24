import { Modal } from "../Modal/Modal";

interface SettingsProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleSaveSettings: () => void;
}

export const Settings = ({ isModalOpen, closeModal, handleSaveSettings }: SettingsProps) => {
  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal} onSettingsSave={handleSaveSettings}>
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
      )}
    </>
  );
};
