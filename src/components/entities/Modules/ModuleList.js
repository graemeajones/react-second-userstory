import { useState } from 'react';
import Card from '../../UI/Card.js';
import ModuleCard from './ModuleCard.js';
import ToolTipDecorator from '../../UI/ToolTipDecorator.js';
import Action from '../../UI/Actions.js';
import './ModuleList.scss';

import RenderCount from '../../UI/RenderCount.js';


export default function ModuleList({ modules, loadingMessage, actions, handlers }) {
  // Properties ----------------------------------
  // State ---------------------------------------
  const [showFavourites, setShowFavourites] = useState(false);
  
  // Context -------------------------------------
  // Methods -------------------------------------
  const handleListAllModules = () => setShowFavourites(false);
  const handleListFavourites = () => setShowFavourites(true);
  
  // View ----------------------------------------
  return (
    <div className="ModuleList">
      <RenderCount background="Red" />

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
        {
          actions.map((action) => action)
        }
      </Action.Tray>

      {
        !modules
          ? <p>{loadingMessage}</p>
          : modules.length === 0
              ? <p>No modules found</p>
              : <Card.Container>
                  {
                    modules.map((module) => 
                      (!showFavourites || module.isSubscribed) &&
                        <ModuleCard
                          key={module.ModuleID}
                          module={module}
                          handlers={handlers}
                        />
                    )
                  }
                </Card.Container>
      }
    </div>
  )
}
