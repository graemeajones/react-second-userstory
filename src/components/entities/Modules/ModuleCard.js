import PropTypes from 'prop-types';
import HoverDecorator from '../../UI/HoverDecorator.js';
import FavouriteDecorator from '../../UI/FavouriteDecorator.js';
import Card from '../../UI/Card.js';
import ToolTipDecorator from '../../UI/ToolTipDecorator.js';
import Action from '../../UI/Actions.js';
import './ModuleCard.scss';

import RenderCount from '../../UI/RenderCount.js';


ModuleCard.propTypes = {
  module: PropTypes.shape({
    isSubscribed: PropTypes.bool,
    ModuleID: PropTypes.number.isRequired,
    ModuleName: PropTypes.string.isRequired,
    ModuleCode: PropTypes.string.isRequired,
    ModuleLevel: PropTypes.number.isRequired,
    ModuleImageURL: PropTypes.string.isRequired,
    ModuleYearID: PropTypes.number.isRequired,
    ModuleYearName: PropTypes.string.isRequired,
    ModuleLeaderID: PropTypes.number.isRequired,
    ModuleLeaderName: PropTypes.string.isRequired
  }),
  handlers: PropTypes.exact({
    handleSelect: PropTypes.func.isRequired,
    handleSubscribe: PropTypes.func.isRequired,
    handleUnsubscribe: PropTypes.func.isRequired,
    handleModify: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  })
};

export default function ModuleCard({module,handlers}) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <HoverDecorator>
      <Card>
      <RenderCount background='Blue' />
        
        <FavouriteDecorator
            isFavourite={module.isSubscribed}
            unFavourite={() => handlers.handleUnsubscribe(module.ModuleID)}
        />

        <div className="moduleCardLayout">

          <div className="cardImage"  onClick={() => handlers.handleSelect(module)}>
            <img src={module.ModuleImageURL} alt="Visual representation of module" />
          </div>

          <div className="cardDetails"  onClick={() => handlers.handleSelect(module)}>
            <h1>{module.ModuleName} ({module.ModuleCode})</h1>
            <p>
              <span className="cardAttribute">Level</span>
              <span className="cardValue">{module.ModuleLevel} ({module.ModuleYearName})</span>
            </p>

          </div>

          <div className="cardActions">
            <Action.Tray>
              {module.isSubscribed
                ? <ToolTipDecorator message="Click to remove module to favourites">
                    <Action.Unsubscribe onClick={() => handlers.handleUnsubscribe(module.ModuleID)} />
                  </ToolTipDecorator>
                : <ToolTipDecorator message="Click to add module to favourites">
                    <Action.Subscribe onClick={() => handlers.handleSubscribe(module.ModuleID)} />
                  </ToolTipDecorator>
              }
              <ToolTipDecorator message="Click to modify module details">
                <Action.Modify onClick={() => handlers.handleModify(module)} />
              </ToolTipDecorator>
              <ToolTipDecorator message="Delete module from list">
                <Action.Delete onClick={() => handlers.handleDelete(module)} />
              </ToolTipDecorator>
            </Action.Tray>
          </div>

        </div>

      </Card>
    </HoverDecorator>
  );
}
