import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import handleInitialData from "../actions/shared";
import ExchangePage from "./ExchangePage";
import Layout from "./Layout";
import NewCurrency from "./NewCurrency";

class App extends Component {
  state = {
    exchangeRates: [],
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/add' component={NewCurrency} />
          <Route path='/' exact component={ExchangePage} />
        </Switch>
      </Layout>
    );
  }
}

export default connect()(App);
