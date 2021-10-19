import * as React from 'react';
import { Portal, Modal, ActivityIndicator } from 'react-native-paper';
import store from '../config/storeApp';

class Loading extends React.Component {

  constructor(props) {
      super(props);

      //redux variable
      this.state = store.getState();  
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      this.state = {
        ...this.state,
      };

  }

  render() {
    return (
      <Portal>
            <Modal visible={this.state.isLoading}>
              <ActivityIndicator animating={true} size="large" color='green' />
            </Modal>
          </Portal>
    );
  }
}

export default Loading;