import React from 'react';
import ReactDom from 'react-dom';
import HoldButton from '../main';
import Inbox from './inbox';

require('./styles.scss');

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){

    return (<div>
            <Inbox />
          </div>);

  }
}


ReactDom.render(<Example />, document.getElementById('app'));
