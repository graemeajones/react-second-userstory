import userAccessor from '../model/userAccessor.js';
import useLoad from '../model/useLoad.js';
import Modal from '../UI/Modal.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';
import StudentList from '../entities/Users/StudentList.js';
import StudentForm from '../entities/Users/StudentForm.js';

import RenderCount from '../UI/RenderCount.js';


export default function MyStudents({module}) {
  // Properties ----------------------------------
  // State ---------------------------------------
  const [students, , loadingMessage, loadStudents] = useLoad(userAccessor);
  
  // Context -------------------------------------
  const { handleModal } = Modal.useModal();

  // Methods -------------------------------------
  // Select handler
  const handleSelect = (name) => console.log(`Student ${name} selected`);

   // Delete handlers
  const handleDelete = async (id) => {
    handleDismiss();
    const outcome = await userAccessor.delete(id);
    outcome.success && loadStudents();
  }

  const handleDeleteRequest = (user) => handleModal({
    show: true,
    title: "Alert!",
    content: <p>Are you sure you want to delete student {user.UserFirstname} {user.UserLastname}?</p>,
    actions: [
      <ToolTipDecorator key="ActionYes" message="Click to confirm deletion">
        <Action.Yes showText onClick={() => handleDelete(user.UserID)} />
      </ToolTipDecorator>,
      <ToolTipDecorator key="ActionNo" message="Click to abandon deletion">
        <Action.No showText onClick={() => handleDismiss()} />
      </ToolTipDecorator>
    ]
  });

  // Add handlers
  const handleAdd = async (newUser) => {
    handleDismiss();
    const outcome = await userAccessor.create(newUser);
    outcome.success && loadStudents();
  }

  const handleAddRequest = () => handleModal({
    show: true,
    title: "Add new user",
    content: <StudentForm onSubmit={handleAdd} onCancel={handleDismiss} />,
    actions: null
  });

  // Modify handlers
  const handleModify = async (targetUser) => {
    handleDismiss();
    const outcome = await userAccessor.update(targetUser.ModuleID, targetUser);
    outcome.success && loadStudents();
  }

  const handleModifyRequest = (targetUser) => handleModal({
    show: true,
    title: "Modify user",
    content: <StudentForm onSubmit={handleModify} onCancel={handleDismiss} initialUser={targetUser} />,
    actions: null
  });

  // Modal handler
  const handleDismiss = () => handleModal(false);

  // View ----------------------------------------
  const listActions = [
    <ToolTipDecorator key="ActionAdd" message="Add a new student">
      <Action.Add showText onClick={handleAddRequest} />
    </ToolTipDecorator>
  ];

  return (
    <>
      <RenderCount background="Yellow" fontColor="Black" />
      
      <h1>Class List</h1>

      <StudentList
        students={students}
        loadingMessage={loadingMessage}
        actions={listActions}
        handlers={{
          handleSelect,
          handleModify: handleModifyRequest,
          handleDelete: handleDeleteRequest
        }}
      />
    </>
  )
}
