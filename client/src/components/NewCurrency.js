import React, { Component } from "react";
import { connect } from "react-redux";

import { handleReceiveBaseCurrencies } from "../actions/baseCurrencies";
import {
  addExchangeRate,
  addExchangeRateRemoveSuccess,
} from "../actions/exchangeRates";
import NewBaseCurrency from "./NewBaseCurrency";

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
    if (
      this.props.bases !== prevProps.bases &&
      Object.keys(this.props.bases).length > 0
    ) {
      const base = this.props.bases[Object.keys(this.props.bases)[0]];
      this.setState((state) => ({
        ...state,
        inputs: {
          ...state.inputs,
          baseCurrency: {
            ...state.inputs.baseCurrency,
            value: base.base_currency,
            id: base.id,
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
      bases: baseCurrencies,
    } = this.props;

    let baseCurrencyInputClasses = "form-input";
    if (baseCurrency.valid === true) {
      baseCurrencyInputClasses += " disabled-input";
    }

    let nameBtnCreate = "Create";
    if (isAddingExchangeRate === true) {
      nameBtnCreate = "Creating...";
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

    let form = (
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
    );

    let formTitle = "Create New Exchange Rate";

    // Set loading message if baseCurrency is null
    if (baseCurrencies === null) {
      form = <p className='loading'>Loading form...</p>;
      formTitle = null;
    }

    let baseCurrencyNB = null;

    // Check if Base currencies is empty to show the form to add one
    if (baseCurrencies !== null && Object.keys(baseCurrencies).length === 0) {
      form = <NewBaseCurrency></NewBaseCurrency>;
      baseCurrencyNB = (
        <p className='center'>
          <span className='nb'>NB: </span>
          <span className='message'>
            Creating an Exchange Rate requires a Base Currency, which is not yet
            set. Use the following form to create one!
          </span>
        </p>
      );
      formTitle = "Create Base Currency";
    }
    return (
      <div className='new-currency'>
        <div className='new-currency-header'>
          {baseCurrencyNB}
          <h3 className='new-currency-title center'>{formTitle}</h3>
        </div>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({ baseCurrency, exchangeRates }) => {
  return {
    bases: baseCurrency.bases,
    isAddingExchangeRate: exchangeRates.loadingAddExchangeRate,
    errorAddExchangeRate: exchangeRates.errorAddExchangeRate,
    showSuccessMessage: exchangeRates.showSuccessMessage,
  };
};

export default connect(mapStateToProps)(NewCurrency);
