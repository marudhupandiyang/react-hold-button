import React, { PropTypes } from 'react';
require('./styles.scss');

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    }
  }

  isCurrentlyPressed = () => {
    return this.state.isPressed;
  };

  onMouseDown = () => {
    this.longPressTimeout = setTimeout(this.longPressStart, this.props.timeout)
  };

  onMouseOut = () => {
    clearTimeout(this.longPressTimeout);
    clearInterval(this.pressInterval);
    this.longPressEnd();
    this.setState({
      isPressed: false,
    });
  };

  longPressStart = () => {
    this.props.longPressStart();
    if(this.props.pressCallback) {
      this.props.pressCallback();
      this.pressInterval = setInterval(this.props.pressCallback, this.props.pressCallbackTimeout);
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
        <img
          src={this.props.img}
          className="hold-image"
        />
      </button>);
  }
}

AwesomeComponent.defaultProps = {
  img: require('./clap.svg'),
  timeout: 300,
  longPressStart: () => {},
  longPressEnd: () => {},
  pressCallbackTimeout: 100,
  pressCallback: undefined,
};

AwesomeComponent.propTypes = {
  img: PropTypes.string,
  timeout: PropTypes.number,
  longPressStart: PropTypes.func,
  longPressEnd: PropTypes.func,
  pressCallbackTimeout: PropTypes.number,
  pressCallback: PropTypes.func,
};

export default AwesomeComponent;
