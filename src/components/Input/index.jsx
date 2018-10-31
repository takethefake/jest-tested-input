// @flow

import * as React from "react";

type Props = HTMLInputElement & {
  label: string,
  initialValue: string,
  onSubmit: (currentValue: string) => void,
  onKeyPress: (e: KeyboardEvent) => void,
  onChange: (currentValue: string) => void
};

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Input extends React.Component<Props> {
  static defaultProps = {
    label: "Input",
    initialValue: "",
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  inputRef = null;
  state = {
    value: this.props.initialValue ? this.props.initialValue : ""
  };

  getState() {
    return {
      value:
        this.props.value !== undefined ? this.props.value : this.state.value
    };
  }

  onChange = e => {
    const { onChange } = this.props;
    if (this.props.value !== undefined) {
      if (onChange) {
        onChange(e.target.value);
      }
    } else {
      this.setState({ value: e.target.value }, () => {
        if (onChange) {
          onChange(this.state.value);
        }
      });
    }
  };

  onKeyPress = e => {
    if (e.keyCode == 13) {
      this.props.onSubmit(this.state.value);
    }
  };

  render() {
    const {
      ref,
      label,
      initialValue,
      onChange,
      onKeyPress,
      ...rest
    } = this.props;
    const { value } = this.getState();
    return (
      <div>
        <label htmlFor={this.inputRef}>{this.props.label}</label>
        <input
          ref={this.inputRef}
          value={value}
          aria-label={label}
          onChange={this.onChange}
          onKeyDown={this.onKeyPress}
          {...rest}
        />
      </div>
    );
  }
}

export { Input };
