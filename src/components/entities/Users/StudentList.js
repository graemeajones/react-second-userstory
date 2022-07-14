import Card from '../../UI/Card.js';
import StudentCard from './StudentCard.js';
import Action from '../../UI/Actions.js';
import './UserList.scss';

import RenderCount from '../../UI/RenderCount.js';


export default function StudentList({ students, loadingMessage, actions, handlers }) {
  // Properties ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="UserList">
      <RenderCount background="Red" />

      <Action.Tray>
        {
          actions.map((action) => action)
        }
      </Action.Tray>

      {
        !students
          ? <p>{loadingMessage}</p>
          : students.length === 0
              ? <p>No students found</p>
              : <Card.Container>
                  {
                    students.map((student) => 
                      <StudentCard
                        key={student.UserID}
                        student={student}
                        handlers={handlers}
                      />
                    )
                  }
                </Card.Container>
      }
    </div>
  )
}
