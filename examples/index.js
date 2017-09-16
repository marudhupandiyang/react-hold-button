import React from 'react';
import ReactDom from 'react-dom';
import HoldButton from '../main';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countDown: 0,
      previousCountDown: 0,
    };
  }

  longPressStart = () =>  {};

  longPressEnd = () => {
    this.setState({
      countDown: 0,
      previousCountDown: this.state.countDown,
    });
  };

  isPressing = () => {
    this.setState({
      countDown: this.state.countDown + 1,
    });
  };

  render(){

    return (<div>
            <HoldButton
              longPressEnd={this.longPressEnd}
              longPressStart={this.longPressStart}
              pressCallback={this.isPressing}
              pressCallbackTimeout={100}
            />
            <br />
            Count down: { this.state.countDown} <br/>
            previousCountDown down: { this.state.previousCountDown}
          </div>);

  }
}


ReactDom.render(<Example />, document.getElementById('app'));
