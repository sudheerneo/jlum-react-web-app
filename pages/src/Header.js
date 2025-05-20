import { Component, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import Carousal from "./Carousal";

export default class Header extends Component {
  constructor() {
    super();
    this.state = { title: "JLUM | Project Demo | Developed by Sudheer Neo" };
  }

  componentDidMount() {
    const url = window.location.pathname;
    url === "/about" ? this.setState({ title: "JLUM-About" }) : 0;
    url === "/prayer-request"
      ? this.setState({ title: "JLUM-Prayer request" })
      : 0;
    url === "/contact" ? this.setState({ title: "JLUM-Contact" }) : 0;
    url === "/donate" ? this.setState({ title: "JLUM-Donate" }) : 0;
  }

  render() {
    return (
      //////////////////////////////////////////////////////////////////////////
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{this.state.title}</title>
        </Head>
        <header className="header">
          <Navbar />
          <Carousal />
        </header>
      </div>
      /////////////////////////////////////////////////////////////////////////////////////////////
    );
  }
}
