import React, { Component } from "react";
import { connect } from "react-redux";

class ExchangePage extends Component {
  state = {
    inputs: {
      optionOne: {
        value: 1,
      },
      optionTwo: {
        value: 1,
      },
    },
  };

  handleInputChange = (event, inputName) => {
    const updatedInputs = {
      ...this.state.inputs,
      [inputName]: {
        ...this.state.inputs[inputName],
        value: event.target.value,
      },
    };
    this.setState({ inputs: updatedInputs });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleSelectChange = (event) => {};

  render() {
    const { optionOne, optionTwo } = this.state.inputs;
    const { exchangeRates, baseCurrencies } = this.props;
    console.log(exchangeRates);
    console.log(baseCurrencies);
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='form__control'>
            <div className='form__group'>
              <input
                className='form-input'
                type='number'
                placeholder='Enter value'
                value={optionOne.value}
                onChange={(event) => this.handleInputChange(event, "optionOne")}
              />
            </div>
            <div className='form__group'>
              <select
                className='form-input select-placeholder'
                onChange={this.handleSelectChange}
                value={1}
                required
              >
                <option key={0} value='' disabled>
                  Select User
                </option>
                {}
              </select>
            </div>
          </div>
          <div className='form__control'>
            <div className='form__group'>
              <input
                className='form-input'
                type='number'
                placeholder='Enter value'
                value={optionTwo.value}
                onChange={(event) => this.handleInputChange(event, "optionTwo")}
              />
            </div>
            <div className='form__group'>
              <select
                className='form-input select-placeholder'
                onChange={this.handleSelectChange}
                value={2}
                required
              >
                <option key={0} value='' disabled>
                  Select User
                </option>
                {}
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ exchangeRates, baseCurrencies }) => ({
  exchangeRates,
  baseCurrencies,
});

export default connect(mapStateToProps)(ExchangePage);
