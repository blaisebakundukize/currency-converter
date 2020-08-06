import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import handleInitialData from "../actions/shared";
import ExchangePage from "./ExchangePage";
import Layout from "./Layout";
import NewCurrency from "./NewCurrency";
import Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  state = {
    exchangeRates: [],
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth} />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path='/add'
            component={NewCurrency}
          />
          <Route path='/' exact component={ExchangePage} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  isAuthenticated: login.token !== null,
});

export default connect(mapStateToProps)(App);
