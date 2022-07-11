import { useState } from 'react';
import moduleAccessor from '../model/moduleAccessor.js';
import useLoad from '../model/useLoad.js';
import { CardContainer } from '../UI/Card.js';
import ModuleCard from '../entities/Modules/ModuleCard.js';
import ModuleForm from '../entities/Modules/ModuleForm.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';
import Modal from '../UI/Modal.js';
import './MyModules.css';

import RenderCount from '../UI/RenderCount.js';

// THIS FILE CONTAINS TODOs!!


export default function MyModules() {
  // Properties ----------------------------------
  // State ---------------------------------------
  const [showFavourites, setShowFavourites] = useState(false);
  const [modules, setModules, loadingMessage, loadModules] = useLoad(moduleAccessor);
  
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(undefined);
  const [modalContent, setModalContent] = useState(undefined);
  const [modalActions, setModalActions] = useState([]);

  // Context -------------------------------------
  // Methods -------------------------------------
  // Select handler
  const handleSelect = (name) => console.log(`Module ${name} selected`);

  // List handlers
  const handleListAllModules = () => setShowFavourites(false);
  const handleListFavourites = () => setShowFavourites(true);
  
  // Favourite handlers
  const handleSubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: true } : module)
  );

  const handleUnsubscribe = (id) => setModules(
    modules.map((module) => module.ModuleID === id ? { ...module, isSubscribed: false } : module)
  );

  // Delete handlers
  const handleDelete = async (id) => {
    handleDismiss();
    const outcome = await moduleAccessor.delete(id);
    outcome.success && loadModules();
  }

  const handleDeleteRequest = (id) => {
    const deleteModule = modules.find((module) => module.ModuleID === id);
    setModalHeading("Alert!");
    setModalContent(<p>Are you sure you want to delete module {deleteModule.ModuleCode} {deleteModule.ModuleName}?</p>);
    setModalActions(
      [
        <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
          <Action.Yes showText onClick={() => handleDelete(id)} />
        </ToolTipDecorator>,
        <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
          <Action.No showText onClick={() => handleDismiss()} />
        </ToolTipDecorator>
      ]
    );
    setShowModal(true);
  };

  // Add handlers
  const handleAdd = async (newModule) => {
    handleDismiss();
    newModule.ModuleCohortID = 1; // Todo: This needs removing
    newModule.ModuleLeaderID = 820; // Todo: This needs removing
    const outcome = await moduleAccessor.create(newModule);
    outcome.success && loadModules();
  }

  const handleAddRequest = () => {
    setModalHeading("Add new module");
    setModalContent(<ModuleForm onSubmit={handleAdd} onCancel={handleDismiss} />);
    setModalActions(null);
    setShowModal(true);
  };

  // Modify handlers
  const handleModify = async (targetModule) => {
    handleDismiss();
    delete targetModule.ModuleCohort; // Todo: This needs removing
    delete targetModule.ModuleLead; // Todo: This needs removing
    const outcome = await moduleAccessor.update(targetModule.ModuleID, targetModule);
    outcome.success && loadModules();
  }

  const handleModifyRequest = (targetModule) => {
    setModalHeading("Modify module");
    setModalContent(<ModuleForm onSubmit={handleModify} onCancel={handleDismiss} initialModule={targetModule} />);
    setModalActions(null);
    setShowModal(true);
  };

  // Modal handlers
  const handleDismiss = () => setShowModal(false);

  // View ----------------------------------------
  return (
    <>
      <RenderCount background="Red" />
      <h1>My Modules</h1>

      <Action.Tray>
        {
          showFavourites
            ? <ToolTipDecorator message="List all modules">
                <Action.ListAll showText onClick={handleListAllModules} />
              </ToolTipDecorator>
            : <ToolTipDecorator message="List favourite modules">
                <Action.Favourites showText onClick={handleListFavourites} />
              </ToolTipDecorator>
        }
        <ToolTipDecorator message="Add a new module">
          <Action.Add showText onClick={handleAddRequest} />
        </ToolTipDecorator>
      </Action.Tray>

      {
        !modules
          ? <p>{loadingMessage}</p>
          : modules.length === 0
              ? <p>No modules found</p>
              : <CardContainer>
                  {
                    modules.map((module) => 
                      (!showFavourites || module.isSubscribed) &&
                        <ModuleCard
                          key={module.ModuleID}
                          module={module}
                          handlers={{
                            handleSelect,
                            handleSubscribe,
                            handleUnsubscribe,
                            handleModify: handleModifyRequest,
                            handleDelete: handleDeleteRequest
                          }}
                        />
                    )
                  }
                </CardContainer>
      }

      {
        showModal &&
          <Modal title={modalHeading} actions={modalActions}>
            {modalContent}
          </Modal>
      }
    </>
  )
}
