import React from 'react';
import ReactDom from 'react-dom';
import HoldButton from '../main';
require('./styles.scss');

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

  deleteRequest = () => {
    alert('Delete');
  }

  render(){

    return (<div>
            One Action <br />
            <HoldButton
              longPressEnd={this.deleteRequest}
              longPressStart={this.longPressStart}
              pressCallbackTimeout={1000}
            >
              Delete
            </HoldButton>

            <br /><br />
            Infinite Callbacks <br />
            <HoldButton
              longPressEnd={this.longPressEnd}
              longPressStart={this.longPressStart}
              pressCallback={this.isPressing}
              pressCallbackTimeout={100}
              finite={false}
            >
              Likes
            </HoldButton>

            <br />
            <br />
            Count down: { this.state.countDown} <br/>
            previousCountDown down: { this.state.previousCountDown}
          </div>);

  }
}


ReactDom.render(<Example />, document.getElementById('app'));
