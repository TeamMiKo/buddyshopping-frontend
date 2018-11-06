import React, { Component } from "react";
import EcwidService from "../EcwidService";

export default class Total extends Component {
  state = {
    value: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if ((!eqProps("items"), prevProps, nextProps)) {
      EcwidService.getTotal().then(total => {});
    }
  }

  render() {}
}
