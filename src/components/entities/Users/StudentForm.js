import { useMemo } from 'react';
import Accessor from '../../model/Accessor.js';
import useLoad from '../../model/useLoad.js';
import Form from '../../UI/Form.js';

import RenderCount from '../../UI/RenderCount.js';


const emptyUser = {
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserPassword: "",
  UserRegistered: false,
  UserUsertypeID: 0,
  UserLevel: 0,
  UserImageURL: ""
}

export default function StudentForm({ onSubmit, onCancel, initialUser = emptyUser }) {
  // Initialisation ------------------------------
  const usertypeAccessor = useMemo(() => new Accessor('Usertypes'), []);

  // State ---------------------------------------
  const [user, setUser, errors, setErrors] = Form.useFormState(initialUser);
  const [usertypes, , loadingUsertypesMessage,] = useLoad(usertypeAccessor);
  
  // Handlers ------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidateUser(user) && onSubmit(user);
    setErrors({ ...errors }); // setErrors(errors) does not work; perhaps React thinks errors has not changed?
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = (name === 'UserUsertypeID') || (name === 'UserLevel') ? parseInt(value) : value;
    setUser({ ...user, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
  };

  const isValidateUser = (user) => {
    let isUserValid = true;
    Object.keys(isValid).forEach((key) => {
      if (isValid[key](user[key])) {
        errors[key] = null; // Am I naughty to use the state variable as a temporary variable? See line 18 "setErrors({ ...errors })"
      } else {
        errors[key] = errorMessage[key];
        isUserValid = false;
      }
    });
    return isUserValid;
  }
  
  const isValid = {
    UserFirstname: (name) => name.length > 1,
    UserLastname: (name) => name.length > 1,
    UserEmail: (email) => /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/.test(email),
    UserPassword: (password) => password.length > 7,
    UserRegistered: (status) => status === true || status === false,
    UserUsertypeID: (id) => id !== 0,
    UserLevel: (id) => id !== 0,
    UserImageURL: (url) => /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url)
  };
    
  const errorMessage = {
    UserFirstname: "Name is too short",
    UserLastname: "Name is too short",
    UserEmail: "Email string is not a valid format",
    UserPassword: `Password must be at least 8 characters long`,
    UserRegistered: "Registration status has not been selected",
    UserUsertypeID: "No user type has been selected",
    UserLevel: "Level has not been selected",
    UserImageURL: "User image is not a valid URL"
  }

  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} >
      <RenderCount />

      <Form.Item
        label="First name"
        error={errors.UserFirstname}
      >
        <RenderCount background="Yellow" fontColor="Black"/>
        <input
          type="text"
          name="UserFirstname"
          placeholder="Please enter the user's first name"
          value={user.UserFirstname}
          onChange={handleChange} 
        /> 
      </Form.Item>

      <Form.Item
        label="Last name"
        error={errors.UserLastname}
      >
        <RenderCount background="Yellow" fontColor="Black"/>
        <input
          type="text"
          name="UserLastname"
          placeholder="Please enter the user's last name"
          value={user.UserLastname}
          onChange={handleChange} 
        /> 
      </Form.Item>

      <Form.Item
        label="Email address"
        error={errors.UserEmail}
      >
        <RenderCount background="Orange" fontColor="Black"/>
        <input
          type="text"
          name="UserEmail"
          placeholder="Please enter the user's email address"
          value={user.UserEmail}
          onChange={handleChange} 
        />
      </Form.Item>

      <Form.Item
        label="User type"
        error={errors.UserUsertypeID}
      >
        {
          !usertypes
            ? <p>{loadingUsertypesMessage}</p>
            : usertypes.length === 0
              ? <p>No years found</p>
              : <select
                  name="UserUsertypeID"
                  value={user.UserUsertypeID}
                  onChange={handleChange} 
                >
                  <option key="0" value="0">Select user type ...</option>
                  {
                    usertypes.map((usertype) => 
                      <option key={usertype.UsertypeID} value={usertype.UsertypeID}> {usertype.UsertypeName} </option>
                    )
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="User level"
        advice="Choose a level between 3 and 7 inclusive"
        error={errors.UserLevel}
      >
        <select
          name="UserLevel"
          value={user.UserLevel}
          onChange={handleChange} 
        >
          <option value="0" disabled>Select user's level</option>
          {
            [3, 4, 5, 6, 7].map((level) => <option key={level}>{level}</option>)
          }
        </select>
      </Form.Item>

      <Form.Item
        label="User image URL"
        advice="Provide the URL of an image"
        error={errors.UserImageURL}
      >
        <input
          type="text"
          name="ModuleImage"
          value={user.UserImageURL}
          onChange={handleChange} 
        />
      </Form.Item>

    </Form>
  );
}
