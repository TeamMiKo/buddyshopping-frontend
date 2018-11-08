import React, { Component } from "react";
import "rc-dialog/assets/index.css";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      hasError: false
    };

    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.addEventListener("input", function() {
      if (this.value) {
        this.parentNode.classList.add("field--filled");
      } else {
        this.parentNode.classList.remove("field--filled");
      }
    });
    this.input.current.addEventListener("focus", function() {
      this.parentNode.classList.add("field--focus");
    });
    this.input.current.addEventListener("blur", function() {
      this.parentNode.classList.remove("field--focus");
    });
  }

  setError = () => {
    this.setState({ hasError: true });
  };

  removeError = () => {
    this.setState({ hasError: false });
  };

  onChange = e => {
    this.removeError();
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div
        className={`fieldset fieldset--no-label ${this.state.hasError &&
          "has-error"}`}
        style={{ width: "100%" }}
      >
        <div className="field field--medium">
          <span className="fieldset__svg-icon" />
          <label className="field__label">Instruction Title</label>
          <input
            ref={this.input}
            type="text"
            required
            className="field__input"
            tabIndex="4"
            maxLength="64"
            onChange={this.onChange}
            value={this.state.value}
          />
          <div className="field__placeholder">Instruction Title</div>
          <span className="field-state--success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26px"
              height="26px"
              viewBox="0 0 26 26"
              focusable="false"
            >
              <path d="M5 12l5.02 4.9L21.15 4c.65-.66 1.71-.66 2.36 0 .65.67.65 1.74 0 2.4l-12.3 14.1c-.33.33-.76.5-1.18.5-.43 0-.86-.17-1.18-.5l-6.21-6.1c-.65-.66-.65-1.74 0-2.41.65-.65 1.71-.65 2.36.01z" />
            </svg>
          </span>
          <span className="field-state--close">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 16 16"
              enableBackground="new 0 0 16 16"
              focusable="false"
            >
              <path d="M15.6,15.5c-0.53,0.53-1.38,0.53-1.91,0L8.05,9.87L2.31,15.6c-0.53,0.53-1.38,0.53-1.91,0c-0.53-0.53-0.53-1.38,0-1.9l5.65-5.64L0.4,2.4c-0.53-0.53-0.53-1.38,0-1.91c0.53-0.53,1.38-0.53,1.91,0l5.64,5.63l5.74-5.73c0.53-0.53,1.38-0.53,1.91,0c0.53,0.53,0.53,1.38,0,1.91L9.94,7.94l5.66,5.65C16.12,14.12,16.12,14.97,15.6,15.5z" />
            </svg>
          </span>
        </div>
        {this.state.hasError && (
          <div className="field__error">обязательное поле</div>
        )}
      </div>
    );
  }
}
