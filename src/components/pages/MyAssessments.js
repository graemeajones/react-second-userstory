import { useEffect } from 'react';
import Modal from '../UI/Modal.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';


export default function MyAssessments() {
  // Properties ----------------------------------

  // State ---------------------------------------
  // Context -------------------------------------
  const { handleModal } = Modal.useModal();

  // Methods -------------------------------------
  // View ----------------------------------------
  
  // Setup modal
  const actions = [
    <ToolTipDecorator key="ActionYes" message="Click to dismiss modal">
      <Action.Yes showText onClick={() => handleModal(false)} />
    </ToolTipDecorator>
  ];
  
  useEffect(() => {
    const modal = { show: true, title: "Alert!", content: "Would you like this modal to go away?", actions };
    handleModal(modal);
  }, [handleModal]);

  return (
    <h1>My Assessments</h1>
  );
}
