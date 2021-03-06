import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';


//Custome input component have special behavior on touche and change
//hace owne css
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  //If elemet is initilized as input its will be input field if elment initilized as something dofferen its will be select form
  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) :  (
        <select id={props.id}  value={inputState.value} onChange={changeHandler}>
            <option value =""> -- select an option -- </option>            
            <option value="5ea843e99293e91547d742c7">Adventure</option>
            <option value="5ea8445d9293e91547d742c8">Role-playing</option>
            <option value="5ea5ef68be62a5d46a660f80">Sports</option>
            <option value="5ea844f39293e91547d742c9">Life Simulation</option>
            <option value="5ea845679293e91547d742ca">Fighting game</option>
        </select>
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
