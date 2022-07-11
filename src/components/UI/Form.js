import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Action from '../UI/Actions.js';
import toCamelCase from '../utils/toCamelCase.js';
import './Form.scss';


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default function Form({ children, onSubmit, onCancel }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <form onSubmit={onSubmit} className="Form Bordered">
      <div className="FormTray">
        {children}
      </div>
      <Action.Tray>
        <Action.Submit showText onClick={onSubmit} />
        <Action.Dismiss showText onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  advice: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

function Item({ children, label, advice=null, error=null, onChange }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  const htmlFor = toCamelCase(label);
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
      {
        advice && <p className="FormAdvice">{advice}</p>
      }
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            id: htmlFor,
            className: "FormInput" + (error ? " FormError" : "")
          });
        })
      }
      {
        error && <p className="FormError">{error}</p>
      }
    </div>
  );
}

const useFormState = ( initialObject ) => {
  // Validate ------------------------------------
  if (!initialObject || (initialObject === {}))
    throw new Error("[useFormState] Initial form object with keys must be provided");
    
  // State ---------------------------------------
  const [formObject, setFormObject] = useState(initialObject);
  const [errorObject, setErrorObject] = useState(
    Object.keys(initialObject).reduce((accum, key) => ({ ...accum, [key]: null }), {})
  );

  // Return --------------------------------------
  return [formObject, setFormObject, errorObject, setErrorObject];
}

// -----------------------------------------
// Compose Action Object ///////////////////
// -----------------------------------------

Form.Item = Item;
Form.useFormState = useFormState;
