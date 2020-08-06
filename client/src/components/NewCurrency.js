import React, { Component } from "react";
import { connect } from "react-redux";

import { handleReceiveBaseCurrencies } from "../actions/baseCurrencies";
import {
  addExchangeRate,
  addExchangeRateRemoveSuccess,
} from "../actions/exchangeRates";

class NewCurrency extends Component {
  state = {
    inputs: {
      currency: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 3,
        },
      },
      baseCurrency: {
        value: "",
        id: null,
        valid: false,
        validation: {
          required: true,
        },
      },
      value: {
        value: "",
        valid: false,
        validation: {
          required: true,
        },
      },
    },
  };
  componentDidMount() {
    this.props.dispatch(handleReceiveBaseCurrencies());
  }
  componentDidUpdate(prevProps) {
    if (this.props.base !== prevProps.base) {
      this.setState((state) => ({
        ...state,
        inputs: {
          ...state.inputs,
          baseCurrency: {
            ...state.inputs.baseCurrency,
            value: this.props.base.base_currency,
            id: this.props.base.id,
            valid: true,
          },
        },
      }));
    }
    if (
      this.props.showSuccessMessage === true &&
      this.props.showSuccessMessage !== prevProps.showSuccessMessage
    ) {
      setTimeout(() => {
        this.props.dispatch(addExchangeRateRemoveSuccess());
      }, 2000);
      this.setState((state) => ({
        ...state,
        inputs: {
          ...state.inputs,
          currency: {
            ...state.inputs.currency,
            value: "",
            valid: false,
          },
          value: {
            ...state.inputs.value,
            value: "",
            valid: false,
          },
        },
      }));
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
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

  handleRegister = (event) => {
    event.preventDefault();
    const { currency, baseCurrency, value } = this.state.inputs;
    this.props.dispatch(
      addExchangeRate({
        currency: currency.value,
        base_currency: baseCurrency.id,
        value: value.value,
      })
    );
  };

  render() {
    const { currency, baseCurrency, value } = this.state.inputs;
    const {
      isAddingExchangeRate,
      errorAddExchangeRate,
      showSuccessMessage,
    } = this.props;

    let baseCurrencyInputClasses = "form-input";
    if (baseCurrency.valid === true) {
      baseCurrencyInputClasses += " disabled-input";
    }

    let nameBtnCreate = "Create";
    if (isAddingExchangeRate === true) {
      nameBtnCreate += "...";
    }

    let successMessage = null;
    if (showSuccessMessage === true) {
      successMessage = (
        <p className='text-success center'>Exchange Rate Added Successfully.</p>
      );
    }

    let displayAddExchangeRateErrors = null;

    if (errorAddExchangeRate !== null) {
      const errors = errorAddExchangeRate.split("&&");
      displayAddExchangeRateErrors = errors.map((error, i) => (
        <p className='error' key={i}>
          {error}
        </p>
      ));
    }

    return (
      <div className='auth'>
        <div className='auth-header'>
          <h3 className='auth-title center'>Create New Exchange Rate</h3>
        </div>
        <form onSubmit={this.handleRegister}>
          {successMessage}
          {displayAddExchangeRateErrors}
          <div className='form__group'>
            <input
              className='form-input'
              type='text'
              placeholder='Currency Name'
              value={currency.value}
              onChange={(event) => this.handleChange(event, "currency")}
            />
          </div>
          <div className='form__group'>
            <input
              className={baseCurrencyInputClasses}
              type='text'
              placeholder='Base Currency'
              value={baseCurrency.value}
              disabled
            />
          </div>
          <div className='form__group'>
            <input
              className='form-input'
              type='number'
              placeholder='Value'
              value={value.value}
              onChange={(event) => this.handleChange(event, "value")}
            />
          </div>
          <input
            className='btn btn-green btn-submit'
            disabled={
              currency.valid === false ||
              baseCurrency.valid === false ||
              value.valid === false ||
              isAddingExchangeRate === true ||
              showSuccessMessage === true
            }
            type='submit'
            value={nameBtnCreate}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ baseCurrencies, exchangeRates }) => {
  const bcIds = Object.keys(baseCurrencies);
  return {
    base: bcIds.length > 0 ? baseCurrencies[bcIds[0]] : null,
    isAddingExchangeRate: exchangeRates.loadingAddExchangeRate,
    errorAddExchangeRate: exchangeRates.errorAddExchangeRate,
    showSuccessMessage: exchangeRates.showSuccessMessage,
  };
};

export default connect(mapStateToProps)(NewCurrency);
