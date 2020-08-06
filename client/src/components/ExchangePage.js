import React, { Component } from "react";
import { connect } from "react-redux";

class ExchangePage extends Component {
  state = {
    inputs: {
      inputOne: {
        value: "",
      },
      inputTwo: {
        value: "",
      },
    },
    selects: {
      selectOne: {
        value: "",
      },
      selectTwo: {
        value: "",
      },
    },
  };

  handleChange = (event, element, elementName) => {
    const updatedElement = {
      ...this.state[element],
      [elementName]: {
        ...this.state[element][elementName],
        value: event.target.value,
      },
    };

    this.setState({ [element]: updatedElement });

    if (elementName === "inputOne") {
      this.onInputChangeConvertCurrency({
        amount: parseFloat(event.target.value),
        showIn: "inputTwo",
      });
    }

    if (elementName === "inputTwo") {
      this.onInputChangeConvertCurrency({
        amount: parseFloat(event.target.value),
        showIn: "inputOne",
      });
    }

    const { inputOne, inputTwo } = this.state.inputs;
    const { selectOne, selectTwo } = this.state.selects;

    if (
      elementName === "selectOne" &&
      inputOne.value !== "" &&
      selectTwo.value !== ""
    ) {
      const { exchangeRates } = this.props;
      this.onSelectChangeConvertCurrency({
        amount: inputOne.value,
        showIn: "inputTwo",
        currencyOneRate: parseFloat(exchangeRates[event.target.value].value),
        currencyTwoRate: parseFloat(exchangeRates[selectTwo.value].value),
      });
    }

    if (
      elementName === "selectTwo" &&
      inputTwo.value !== "" &&
      selectOne.value !== ""
    ) {
      const { exchangeRates } = this.props;
      this.onSelectChangeConvertCurrency({
        amount: inputTwo.value,
        showIn: "inputOne",
        currencyOneRate: parseFloat(exchangeRates[selectOne.value].value),
        currencyTwoRate: parseFloat(exchangeRates[event.target.value].value),
      });
    }
  };

  onInputChangeConvertCurrency = (data) => {
    this.setState((state) => ({
      inputs: {
        ...state.inputs,
        inputTwo: {
          ...state.inputs.inputTwo,
          value: data.amount,
        },
      },
    }));
    const { exchangeRates } = this.props;
    const currencyOneRate = parseFloat(
      exchangeRates[this.state.selects.selectOne.value].value
    );
    const currencyTwoRate = parseFloat(
      exchangeRates[this.state.selects.selectTwo.value].value
    );

    this.convertCurrency(data, currencyOneRate, currencyTwoRate);
  };

  onSelectChangeConvertCurrency = (data) => {
    this.convertCurrency(data, data.currencyOneRate, data.currencyTwoRate);
  };

  convertCurrency = (data, currencyOneRate, currencyTwoRate) => {
    if (data.showIn === "inputTwo") {
      const amount = (currencyTwoRate * data.amount) / currencyOneRate;
      this.setState((state) => {
        return {
          inputs: {
            ...state.inputs,
            [data.showIn]: {
              ...state.inputs[data.showIn],
              value: amount,
            },
          },
        };
      });
    } else {
      const amount = (currencyOneRate * data.amount) / currencyTwoRate;
      this.setState((state) => {
        return {
          inputs: {
            ...state.inputs,
            [data.showIn]: {
              ...state.inputs[data.showIn],
              value: amount,
            },
          },
        };
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { inputOne, inputTwo } = this.state.inputs;
    const { selectOne, selectTwo } = this.state.selects;
    const { exchangeRates } = this.props;

    let exchangeForm = <p className='loading'>Loading form...</p>;

    if (exchangeRates !== null) {
      if (Object.keys(exchangeRates).length > 0) {
        const options = [];
        const exchangeRateIds = Object.keys(exchangeRates);
        exchangeRateIds.forEach((id) => {
          options.push(
            <option key={exchangeRates[id].id} value={exchangeRates[id].id}>
              {exchangeRates[id].currency}
            </option>
          );
        });
        exchangeForm = (
          <form className='form' onSubmit={this.handleSubmit}>
            <div className='form__control'>
              <div className='form__group'>
                <input
                  className='form-input'
                  type='number'
                  placeholder='Enter value'
                  value={inputOne.value}
                  disabled={selectOne.value === "" || selectTwo.value === ""}
                  onChange={(event) =>
                    this.handleChange(event, "inputs", "inputOne")
                  }
                />
              </div>
              <div className='form__group'>
                <select
                  className='form-input select-placeholder'
                  onChange={(event) =>
                    this.handleChange(event, "selects", "selectOne")
                  }
                  value={selectOne.value}
                  required
                >
                  <option key={0} value='' disabled>
                    Select Currency
                  </option>
                  {options}
                </select>
              </div>
            </div>
            <div className='form__control'>
              <div className='form__group'>
                <input
                  className='form-input'
                  type='number'
                  placeholder='Enter value'
                  value={inputTwo.value}
                  disabled={selectOne.value === "" || selectTwo.value === ""}
                  onChange={(event) =>
                    this.handleChange(event, "inputs", "inputTwo")
                  }
                />
              </div>
              <div className='form__group'>
                <select
                  className='form-input select-placeholder'
                  onChange={(event) =>
                    this.handleChange(event, "selects", "selectTwo")
                  }
                  value={selectTwo.value}
                  required
                >
                  <option key={0} value='' disabled>
                    Select Currency
                  </option>
                  {options}
                </select>
              </div>
            </div>
          </form>
        );
      } else {
        exchangeForm = <p className='loading'>Exchange Rates Not Found</p>;
      }
    }
    return <div>{exchangeForm}</div>;
  }
}

const mapStateToProps = ({ exchangeRates }) => {
  return {
    exchangeRates: exchangeRates.rates,
  };
};

export default connect(mapStateToProps)(ExchangePage);
