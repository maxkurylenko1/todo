import "./settings.scss";
import { Modal } from "../../components/Modal/Modal";
import type { SettingsType } from "../../types/settings";
import { useState } from "react";
import { useToDoContext } from "../../context/ToDoContext";

interface SettingsProps {
  closeModal: () => void;
}

export const Settings = ({ closeModal }: SettingsProps) => {
  const { updateSettings, settings } = useToDoContext();
  const [currentSettings, setCurrentSettings] = useState<SettingsType>(settings);

  const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCurrentSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
  };

  const handleSaveSettings = () => {
    updateSettings(currentSettings);
    closeModal();
  };

  return (
    <Modal onClose={closeModal} onSave={handleSaveSettings}>
      <div className="modalContent">
        <h2>ToDo Settings</h2>
        <ul>
          <li>
            Title{" "}
            <input
              className="checkbox"
              checked={currentSettings.isTitleActive}
              type="checkbox"
              name="isTitleActive"
              onChange={handleInputChage}
            />
          </li>
          <li>
            Due date{" "}
            <input
              className="checkbox"
              checked={currentSettings.isDueDateActive}
              type="checkbox"
              name="isDueDateActive"
              onChange={handleInputChage}
            />
          </li>
          <li>
            Priority{" "}
            <input
              className="checkbox"
              checked={currentSettings.isPriorityActive}
              type="checkbox"
              name="isPriorityActive"
              onChange={handleInputChage}
            />
          </li>
        </ul>
      </div>
    </Modal>
  );
};
