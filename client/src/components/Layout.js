import React, { Component } from "react";
import { connect } from "react-redux";

import Nav from "./Nav";
import { LoginReset } from "../actions/login";

class Layout extends Component {
  handleLogout = () => {
    this.props.dispatch(LoginReset());
  };
  render() {
    const { isAuthenticated } = this.props;
    let logoutBlock = null;
    if (isAuthenticated === true) {
      logoutBlock = (
        <span className='logout' onClick={this.handleLogout}>
          Logout
        </span>
      );
    }
    return (
      <div className='container'>
        <header className='header'>
          <h1>Currency Converter</h1>
          <Nav />
          {logoutBlock}
        </header>
        <main className='main-content'>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  isAuthenticated: login.token !== null,
});

export default connect(mapStateToProps)(Layout);
