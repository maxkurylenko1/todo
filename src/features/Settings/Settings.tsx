import "./settings.scss";
import { Modal } from "../../components/Modal/Modal";
import type { SettingsType } from "../../types/settings";
import { useState } from "react";
import { useToDoContext } from "../../context/ToDoContext";
import Switch from "react-switch";

interface SettingsProps {
  closeModal: () => void;
}

export const Settings = ({ closeModal }: SettingsProps) => {
  const { updateSettings, addToDosettings } = useToDoContext();
  const [currentSettings, setCurrentSettings] = useState<SettingsType>(addToDosettings);

  const handleInputChage = (checked: boolean, name: string) => {
    setCurrentSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
  };

  const handleSaveSettings = () => {
    updateSettings(currentSettings);
    closeModal();
  };

  return (
    <Modal onClose={closeModal} onSave={handleSaveSettings}>
      <div className="modalContent">
        <h2>Create ToDo Settings</h2>
        <ul>
          <li>
            Title{" "}
            <Switch
              checked={currentSettings.isTitleActive}
              onChange={(checked) => handleInputChage(checked, "isTitleActive")}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#62c465ff"
            />
          </li>
          <li>
            Due date{" "}
            <Switch
              checked={currentSettings.isDueDateActive}
              onChange={(checked) => handleInputChage(checked, "isDueDateActive")}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#62c465ff"
            />
          </li>
          <li>
            Priority{" "}
            <Switch
              checked={currentSettings.isPriorityActive}
              onChange={(checked) => handleInputChage(checked, "isPriorityActive")}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#62c465ff"
            />
          </li>
        </ul>
      </div>
    </Modal>
  );
};
