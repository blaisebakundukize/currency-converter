import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    exchangeRates: [],
  };

  componentDidMount() {
    this.fetchExchangeRates();
  }

  async fetchExchangeRates() {
    const exchangeRates = await axios.get("/api/currency/exchange-rates");
    this.setState({ exchangeRates: exchangeRates });
  }
  render() {
    console.log(this.state.exchangeRates);
    return (
      <div>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>currency Converter</p>
        </header>
      </div>
    );
  }
}

export default App;
