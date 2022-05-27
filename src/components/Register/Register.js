import React, { useState, useReducer, useContext, useRef, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Register.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Register = () => {
    const ctx = useContext(AuthContext)
    
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
    })

    const repeatPasswordReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: action.val===passwordState.value};
            }
        if (action.type === 'INPUT_BLUR') {
            return { value: state.value, isValid: state.value===passwordState.value };
        }
        return { value: '', isValid: false };
    }

    const [repeatPasswordState, dispatchRepeatPassword] = useReducer(repeatPasswordReducer, {
        value: '',
        isValid: null
    })

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef()

    const { isValid: emailIsValid} = emailState;
    const { isValid: passwordIsValid} = passwordState;
    const { isValid: repeatPasswordIsValid} = repeatPasswordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid && repeatPasswordIsValid)
          }, 100);
      
          return () => {
            clearTimeout(identifier)
          }
        }, [emailIsValid, passwordIsValid, repeatPasswordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    };

    const repeatPasswordChangeHandler = (event) => {
        dispatchRepeatPassword({type: 'USER_INPUT', val: event.target.value});
    }

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const validateRepeatPasswordHandler = () => {
        dispatchRepeatPassword({type: 'INPUT_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
    if (formIsValid) {
        ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid){
        emailInputRef.current.focus();
    } else if(!passwordIsValid){
        passwordInputRef.current.focus();
    } else {
        repeatPasswordInputRef.current.focus();
    }
};


  return (
    <Card className={classes.register}>
      <form onSubmit={submitHandler}>
        <Input
            ref={emailInputRef}
            id="email"
            label="E-mail"
            type="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
        />
        <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
        />
        <Input
            ref={repeatPasswordInputRef}
            id="repeatPassword"
            label="Repeat Password"
            type="password"
            isValid={repeatPasswordIsValid}
            value={repeatPasswordState.value}
            onChange={repeatPasswordChangeHandler}
            onBlur={validateRepeatPasswordHandler}
        />
        <div>
            {!repeatPasswordIsValid && passwordIsValid && (repeatPasswordState.value.length > 1) && <h1>Passwords aren't matching</h1>}
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Register;