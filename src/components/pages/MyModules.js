import { useNavigate } from 'react-router-dom';
import moduleAccessor from '../model/moduleAccessor.js';
import useLoad from '../model/useLoad.js';
import Modal from '../UI/Modal.js';
import ModuleList from '../entities/Modules/ModuleList.js';
import ModuleForm from '../entities/Modules/ModuleForm.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';

import RenderCount from '../UI/RenderCount.js';

// THIS FILE CONTAINS TODOs!!


export default function MyModules() {
  // Properties ----------------------------------
  const navigate = useNavigate();

  // State ---------------------------------------
  const [modules, setModules, loadingMessage, loadModules] = useLoad(moduleAccessor);
  
  // Context -------------------------------------
  const { handleModal } = Modal.useModal();

  // Methods -------------------------------------
  // Select handler
  const handleSelect = (name) => navigate('/students');

  // Favourite handlers
  const handleSubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: true } : module)
  );

  const handleUnsubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: false } : module)
  );

  // Add, modify and delete handlers
  const handleAdd = async (newModule) => {
    handleDismiss();
    const outcome = await moduleAccessor.create(newModule);
    outcome.success
      ? loadModules()
      : buildErrorModal("Add module error", outcome.response);
  }

  const handleModify = async (targetModule) => {
    handleDismiss();
    console.log(JSON.stringify(targetModule));
    const outcome = await moduleAccessor.update(targetModule.ModuleID, targetModule);
    outcome.success
      ? loadModules()
      : buildErrorModal("Modify module error", outcome.response);
  }

  const handleDelete = async (id) => {
    handleDismiss();
    const outcome = await moduleAccessor.delete(id);
    outcome.success
      ? loadModules()
      : buildErrorModal("Delete module error", outcome.response);
  }

  // Build modal methods
  const buildAddModal = () => handleModal({
    show: true,
    title: "Add new module",
    content: <ModuleForm onSubmit={handleAdd} onCancel={handleDismiss} />,
    actions: null
  });

  const buildModifyModal = (targetModule) => handleModal({
    show: true,
    title: "Modify module",
    content: <ModuleForm onSubmit={handleModify} onCancel={handleDismiss} initialModule={targetModule} />,
    actions: null
  });

  const buildDeleteModal = (module) => handleModal({
    show: true,
    title: "Alert!",
    content: <p>Are you sure you want to delete module {module.ModuleCode} {module.ModuleName}?</p>,
    actions: [
      <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
        <Action.Yes showText onClick={() => handleDelete(module.ModuleID)} />
      </ToolTipDecorator>,
      <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
        <Action.No showText onClick={() => handleDismiss()} />
      </ToolTipDecorator>
    ]
  });

  const buildErrorModal = (title, message) => handleModal({
    show: true,
    title: title,
    content: <p>{message}</p>,
    actions: [
      <ToolTipDecorator key="ActionNo" message="Click to dismiss error message">
        <Action.Dismiss showText onClick={() => handleDismiss()} />
      </ToolTipDecorator>
    ]
  });

  const handleDismiss = () => handleModal(false);

  // View ----------------------------------------
  const listActions = [
    <ToolTipDecorator key="ActionAdd" message="Add a new module">
      <Action.Add showText onClick={buildAddModal} />
    </ToolTipDecorator>
  ];

  return (
    <>
      <RenderCount background="Yellow" fontColor="Black" />

      <h1>My Modules</h1>

      <ModuleList
        modules={modules}
        loadingMessage={loadingMessage}
        actions={listActions}
        handlers={{
          handleSelect,
          handleSubscribe,
          handleUnsubscribe,
          handleModify: buildModifyModal,
          handleDelete: buildDeleteModal
        }}
      />
    </>
  )
}
