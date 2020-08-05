import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../actions/login";

class Auth extends Component {
  state = {
    inputs: {
      email: {
        value: "",
        valid: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    displayLoginForm: true,
  };

  // componentDidMount() {
  //   this.props.dispatch(handleReceiveUsers());
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { userId } = this.state;
  //   const { dispatch, location, history } = this.props;
  //   dispatch(login(userId));
  //   let redirectTo = "/";
  //   if (location.state !== undefined && location.state !== null)
  //     redirectTo = location.state.redirectTo;
  //   history.replace(redirectTo);
  // };

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state.inputs;
    this.props.dispatch(login(email.value, password.value));
  };

  handleRegister = (event) => {
    event.preventDefault();
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  handleChange = (event, inputName) => {
    const updatedInputs = {
      ...this.state.inputs,
      [inputName]: {
        ...this.state.inputs[inputName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.inputs[inputName].validation
        ),
      },
    };
    this.setState({ inputs: updatedInputs });
  };

  toggleLoginForm = () => {
    this.setState((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        email: {
          ...state.inputs.email,
          value: "",
          valid: false,
        },
        password: {
          ...state.inputs.password,
          value: "",
          valid: false,
        },
      },
      displayLoginForm: !state.displayLoginForm,
    }));
  };

  render() {
    const { isAuthenticated, error: errorLogin } = this.props.login;
    const { email, password } = this.state.inputs;
    const { displayLoginForm } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to='/add' />;
    }

    let displayLoginErrors = null;

    if (errorLogin !== null) {
      const errors = errorLogin.split("&&");
      displayLoginErrors = errors.map((error, i) => (
        <p className='error' key={i}>
          {error}
        </p>
      ));
    }
    const formInputs = (
      <>
        <div className='form__group'>
          <input
            className='form-input'
            type='email'
            placeholder='Email'
            value={email.value}
            disabled={false}
            onChange={(event) => this.handleChange(event, "email")}
          />
        </div>
        <div className='form__group'>
          <input
            className='form-input'
            type='password'
            placeholder='Password'
            value={password.value}
            disabled={false}
            onChange={(event) => this.handleChange(event, "password")}
          />
        </div>
      </>
    );

    const loginForm = (
      <>
        <form onSubmit={this.handleLogin}>
          {displayLoginErrors}
          {formInputs}
          <input
            className='btn btn-green btn-submit'
            disabled={email.valid === false || password.valid === false}
            type='submit'
            value='Log In'
          />
        </form>
        <div className='auth-toggle-form-text' onClick={this.toggleLoginForm}>
          or Sign Up
        </div>
      </>
    );

    const registerForm = (
      <>
        <form onSubmit={this.handleRegister}>
          {formInputs}
          <input
            className='btn btn-green btn-submit'
            disabled={email.valid === false || password.valid === false}
            type='submit'
            value='Sign Up'
          />
        </form>
        <div className='auth-toggle-form-text' onClick={this.toggleLoginForm}>
          or Log In
        </div>
      </>
    );

    return (
      <div className='question auth'>
        <div className='auth-header'>
          <h3 className='auth-title center'>
            {displayLoginForm === true ? "Log in" : "Sign up"} to create new
            currency
          </h3>
        </div>
        <h3 className='auth-form-title center'>
          {displayLoginForm === true ? "Log In" : "Sign Up"}
        </h3>
        {displayLoginForm === true ? loginForm : registerForm}
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  login,
});

export default connect(mapStateToProps)(Auth);
