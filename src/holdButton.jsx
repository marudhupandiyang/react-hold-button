import React, { PropTypes } from 'react';

require('./styles.scss');

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }

  onMouseDown = () => {
    this.longPressTimeout = setTimeout(this.longPressStart, this.props.timeout);
  };

  onMouseOut = () => {
    if (this.longPressTimeout || this.pressInterval) {
      console.log('cleared');
      clearTimeout(this.longPressTimeout);
      clearInterval(this.pressInterval);
      this.longPressTimeout = undefined;
      this.pressInterval = undefined;

      this.longPressEnd();
      this.setState({
        isPressed: false,
      });
    }
  };

  isCurrentlyPressed = () => this.state.isPressed;

  longPressStart = () => {
    this.props.longPressStart();
    // When inifite call the timeout for regular period
    if (!this.props.finite) {
      this.props.pressCallback();
      this.pressInterval = setInterval(this.props.pressCallback, this.props.pressCallbackTimeout);
    } else if (this.props.finite) {
      this.pressInterval = setInterval(this.onMouseOut, this.props.pressCallbackTimeout);
    }

    this.setState({
      isPressed: true,
    });
  };

  longPressEnd = () => {
    this.props.longPressEnd();
  };

  render() {
    return (
      <button
        className={`hold-button ${this.state.isPressed ? 'pressed' : ''}`}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseOut}
      >
        <div className="ripple-layer">
          <span className="ripple-circle"></span>
        </div>
        {this.props.children}
      </button>);
  }
}

AwesomeComponent.defaultProps = {
  timeout: 300,
  longPressStart: () => {},
  longPressEnd: () => {},
  pressCallbackTimeout: 500,
  pressCallback: undefined,
  finite: true,
};

AwesomeComponent.propTypes = {
  img: PropTypes.string,
  timeout: PropTypes.number,
  longPressStart: PropTypes.func,
  longPressEnd: PropTypes.func,
  pressCallbackTimeout: PropTypes.number,
  pressCallback: PropTypes.func,
  finite: PropTypes.bool,
};

export default AwesomeComponent;
