import { useMemo } from 'react';
import Accessor from '../../model/Accessor.js';
import useLoad from '../../model/useLoad.js';
import Form from '../../UI/Form.js';

import RenderCount from '../../UI/RenderCount.js';


const emptyModule = {
  ModuleName: "",
  ModuleCode: "",
  ModuleLevel: 0,
  ModuleYearID: 0,
  ModuleLeaderID: 0,
  ModuleImageURL: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
};

export default function ModuleForm({ onSubmit, onCancel, initialModule = emptyModule }) {
  // Initialisation ------------------------------
  const userAccessor = useMemo(() => new Accessor('Users'), []);
  const yearAccessor = useMemo(() => new Accessor('Years'), []);
  
  // State ---------------------------------------
  const [module, setModule, errors, setErrors] = Form.useFormState(initialModule);
  const [years, ,loadingYearsMessage, ] = useLoad(yearAccessor);
  const [staff, ,loadingUsersMessage, ] = useLoad(userAccessor);
  
  // Handlers ------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidateModule(module) && onSubmit(module);
    setErrors({ ...errors }); // setErrors(errors) does not work; perhaps React thinks errors has not changed?
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = (name === 'ModuleLevel') || (name === 'ModuleYearID') || (name === 'ModuleLeaderID') ? parseInt(value) : value;
    setModule({ ...module, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
  };

  const isValidateModule = (module) => {
    let isModuleValid = true;
    Object.keys(isValid).forEach((key) => {
      if (isValid[key](module[key])) {
        errors[key] = null; // Am I naughty to use the state variable as a temporary variable? See line 18 "setErrors({ ...errors })"
      } else {
        errors[key] = errorMessage[key];
        isModuleValid = false;
      }
    });
    return isModuleValid;
  }
  
  const isValid = {
    ModuleName: (name) => name.length > 8,
    ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
    ModuleLevel: (level) => (level > 2) && (level < 8),
    ModuleLeaderID: (id) => id !== 0,
    ModuleYearID: (id) => id !== 0,
    ModuleImageURL: (url) => /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url)
  };
    
  const errorMessage = {
    ModuleName: "Module name is too short",
    ModuleCode: "Module code is not a valid format",
    ModuleLevel: "Invalid module level",
    ModuleLeaderID: "No module leader has been selected",
    ModuleYearID: "No delivery year has been selected",
    ModuleImageURL: "Module image is not a valid URL"
  }

  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} >
      <RenderCount />
      <Form.Item
        label="Module name"
        error={errors.ModuleName}
      >
        <RenderCount background="Yellow" fontColor="Black"/>
        <input
          type="text"
          name="ModuleName"
          placeholder="Please enter the module name"
          value={module.ModuleName}
          onChange={handleChange} 
        /> 
      </Form.Item>
      
      <Form.Item
        label="Module code"
        error={errors.ModuleCode}
      >
        <RenderCount background="Orange" fontColor="Black"/>
        <input
          type="text"
          name="ModuleCode"
          placeholder="Please enter the module code"
          value={module.ModuleCode}
          onChange={handleChange} 
        />
      </Form.Item>

      <Form.Item
        label="Module level"
        advice="Choose a level between 3 and 7 inclusive"
        error={errors.ModuleLevel}
      >
        <select
          name="ModuleLevel"
          value={module.ModuleLevel}
          onChange={handleChange} 
        >
          <option value="0" disabled>Select module level</option>
          {
            [3, 4, 5, 6, 7].map((level) => <option key={level}>{level}</option>)
          }
        </select>
      </Form.Item>

      <Form.Item
        label="Module year"
        error={errors.ModuleYearID}
      >
        {
          !years
            ? <p>{loadingYearsMessage}</p>
            : years.length === 0
              ? <p>No years found</p>
              : <select
                  name="ModuleYearID"
                  value={module.ModuleYearID}
                  onChange={handleChange} 
                >
                  <option value="0">Select delivery year ...</option>
                  {
                    years.map((year) => 
                      <option key={year.YearID} value={year.YearID}> {year.YearName} </option>
                    )
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="Module leader"
        error={errors.ModuleLeaderID}
      >
        {
          !staff
            ? <p>{loadingUsersMessage}</p>
            : staff.length === 0
              ? <p>No users found</p>
              : <select
                  name="ModuleLeaderID"
                  value={module.ModuleLeaderID}
                  onChange={handleChange} 
                >
                  <option value="0">Select module leader ...</option>
                  {
                    staff.map((user) => 
                      <option key={user.UserID} value={user.UserID} >
                        {user.UserLastname}, {user.UserFirstname}
                      </option>
                    )
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="Module image URL"
        advice="Provide the URL of an image"
        error={errors.ModuleImageURL}
      >
        <input
          type="text"
          name="ModuleImageURL"
          value={module.ModuleImageURL}
          onChange={handleChange} 
        />
      </Form.Item>

    </Form>
  );
}
