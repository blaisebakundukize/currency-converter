import React, { Component } from "react";

import Nav from "./Nav";

class Layout extends Component {
  render() {
    return (
      <div className='container'>
        <header className='header'>
          <h1>Currency Converter</h1>
          <Nav />
        </header>
        <main className='main-content'>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
