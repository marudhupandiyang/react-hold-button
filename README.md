## react-long-press
A simple button that gives you ability to let the user long press and perform some activity as long as the user is pressing the button. `Long Press` is defined as the user holding the button with their mouse for a long time.

### Installation:

    npm install react-long-press

    
### Usage:

    import ReactHoldButton from 'react-long-press';

    class Example extends React.Component {
    
      longPressStart = () => {
        console.log('Long press Started');
      };
      
      longPressEnd = () => {
        console.log('Long press Ends');
      };
      
      render(){
       return (<div>
            <LongPressBtn
              ref={(btn) => { this.holdButton = btn; }}
              longPressEnd={this.longPressEnd}
              longPressStart={this.longPressStart}
              pressCallbackTimeout={2000}
              className="my-delete-button"
            />
          </div>);
      }
    }

Pass a custom `className` prop and add custom CSS for button looks. A simple one is given below

    .my-delete-button {
      background-color: #fff;
      border: 1px solid red;
      border-radius: 2px;
      padding: 5px;
      margin-top: 8px;

      &:hover {
        background-color: red;
        color: #fff;
      }
    }
    

### API

 - `longPressStart` - This function will be called when long press starts.
 - `longPressEnd` - This function will be called when long press ends.
 - `pressCallback` - [optional] This function will be called for every `pressCallbackTimeout` milliseconds.
-  `isPressed` - This function is available with the instance. Returns `true` if the long press is active at any given time. Returns `false` if long press is not active at that moment.
    
    eg:  

       <ReactHoldButton
          ref={(btn) => { this.holdButton = btn; }}
          {/* ..other props */}
        />

        Then, the function can be invoked as 

            this.holdButton.isPressed()

### Props 

- `pressCallbackTimeout` - [optional] Defines the timeout in milliseconds for which the `pressCallback` should be called. Default is `100`. 
- `timeout` - [optional] Defines the time the mouse should be held on the button for `long press` to start. Default is `300`. When the user is holding their mouse down on the component for 300 milliseconds, the `longPressStart` callback is invoked.

