import React, { Component } from "react";
import { connect } from "react-redux";

import { checkValidity } from "../utils/helpers";
import { handleCreateBaseCurrency } from "../actions/baseCurrencies";

class NewBaseCurrency extends Component {
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
      value: {
        value: 1,
        valid: true,
        validation: {
          required: true,
        },
      },
    },
  };

  handleChange = (event, inputName) => {
    const updatedInputs = {
      ...this.state.inputs,
      [inputName]: {
        ...this.state.inputs[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.inputs[inputName].validation
        ),
      },
    };
    this.setState({ inputs: updatedInputs });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(
      handleCreateBaseCurrency({
        base_currency: this.state.inputs.currency.value,
        value: this.state.inputs.value.value,
      })
    );
  };

  render() {
    const { currency, value } = this.state.inputs;
    const { isCreatingBaseCurrency, errorCreatingBaseCurrency } = this.props;

    let nameBtnCreate = "Create";
    if (isCreatingBaseCurrency === true) {
      nameBtnCreate = "Creating...";
    }

    let displayCreateBaseCurrencyErrors = null;

    if (errorCreatingBaseCurrency !== null) {
      const errors = errorCreatingBaseCurrency.split("&&");
      displayCreateBaseCurrencyErrors = errors.map((error, i) => (
        <p className='error' key={i}>
          {error}
        </p>
      ));
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {displayCreateBaseCurrencyErrors}
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
            className='form-input disabled-input'
            type='number'
            placeholder='Value'
            value={value.value}
            disabled
            onChange={(event) => this.handleChange(event, "value")}
          />
        </div>
        <input
          className='btn btn-green btn-submit'
          disabled={
            currency.valid === false ||
            value.valid === false ||
            isCreatingBaseCurrency === true
          }
          type='submit'
          value={nameBtnCreate}
        />
      </form>
    );
  }
}

const mapStateToProps = ({ baseCurrency }) => ({
  isCreatingBaseCurrency: baseCurrency.loadingCreatingBaseCurrency,
  errorCreatingBaseCurrency: baseCurrency.errorCreatingBaseCurrency,
});

export default connect(mapStateToProps)(NewBaseCurrency);
