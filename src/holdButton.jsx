import React, { PropTypes } from 'react';

require('./styles.scss');

class HoldButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }

  onMouseDown = () => {
    this.clearTimeout();
    this.longPressTimeout = setTimeout(this.longPressStart, this.props.startTimeout);
  };

  onMouseOut = () => {
    this.clearTimeout();
    if (this.isCurrentlyPressed()) {
      this.setState({
        isPressed: false,
      });
    }
  };

  clearTimeout = () => {
    clearTimeout(this.longPressTimeout);
    clearInterval(this.pressInterval);
    this.longPressTimeout = undefined;
    this.pressInterval = undefined;
  }

  isCurrentlyPressed = () => this.state.isPressed;

  longPressStart = () => {
    this.props.longPressStart();
    // When inifite call the timeout for regular period
    if (!this.props.finite) {
      this.props.pressCallback();
      this.pressInterval = setInterval(this.props.pressCallback, this.props.pressCallbackTimeout);
    } else if (this.props.finite) {
      this.pressInterval = setTimeout(this.longPressEnd, this.props.pressCallbackTimeout);
    }

    this.setState({
      isPressed: true,
    });
  };

  longPressEnd = () => {
    this.onMouseOut();
    this.props.longPressEnd();
  };

  render() {
    return (
      <button
        className={`hold-button ${this.props.className} ${this.state.isPressed ? 'pressed' : ''}`}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseOut}
      >
        <div className="ripple-layer">
          <span className="ripple-circle" />
        </div>
        {this.props.children}
      </button>);
  }
}

HoldButton.defaultProps = {
  startTimeout: 300,
  longPressStart: () => {},
  longPressEnd: () => {},
  pressCallbackTimeout: 500,
  pressCallback: undefined,
  finite: true,
  className: '',
};

HoldButton.propTypes = {
  startTimeout: PropTypes.number,
  longPressStart: PropTypes.func,
  longPressEnd: PropTypes.func,
  pressCallbackTimeout: PropTypes.number,
  pressCallback: PropTypes.func,
  finite: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default HoldButton;
