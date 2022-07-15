import PropTypes from 'prop-types';
import HoverDecorator from '../../UI/HoverDecorator.js';
import Card from '../../UI/Card.js';
import ToolTipDecorator from '../../UI/ToolTipDecorator.js';
import Action from '../../UI/Actions.js';
import './StudentCard.scss';

import RenderCount from '../../UI/RenderCount.js';


StudentCard.propTypes = {
  module: PropTypes.shape({
    UserID: PropTypes.number.isRequired,
    UserFirstname: PropTypes.string.isRequired,
    UserLastname: PropTypes.string.isRequired,
    UserEmail: PropTypes.string.isRequired,
    UserPassword: PropTypes.string.isRequired,
    UserRegistered: PropTypes.bool.isRequired,
    UserUsertypeID: PropTypes.number.isRequired,
    UserLevel: PropTypes.number.isRequired,
    UserImageURL: PropTypes.string.isRequired
  }),
  handlers: PropTypes.exact({
    handleSelect: PropTypes.func.isRequired,
    handleModify: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  })
};

export default function StudentCard({student,handlers}) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <HoverDecorator>
      <Card>
        <RenderCount background='Blue' />
        
        <div className="studentCardLayout">

          <div className="cardImage" onClick={() => handlers.handleSelect(student.UserID)}>
            <img src={student.UserImageURL} alt="Visual representation of the user" />
          </div>

          <div className="cardRightPane">

            <div className="cardDetails" onClick={() => handlers.handleSelect(student.UserID)}>
              <h1>{student.UserFirstname} {student.UserLastname.toUpperCase()}</h1>
              <p>
                <span className="cardAttribute">Level</span>
                <span className="cardValue">{student.UserLevel}</span>
              </p>
              <p>
                <span className="cardAttribute">{student.UserEmail}</span>
              </p>
            </div>

            <div className="cardActions">
              <Action.Tray>
                <ToolTipDecorator message="Click to modify student details">
                  <Action.Modify onClick={() => handlers.handleModify(student)} />
                </ToolTipDecorator>
                <ToolTipDecorator message="Delete student from class list">
                  <Action.Delete onClick={() => handlers.handleDelete(student)} />
                </ToolTipDecorator>
              </Action.Tray>
            </div>

          </div>

        </div>

      </Card>
    </HoverDecorator>
  );
}
