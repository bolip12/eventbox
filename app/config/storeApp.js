import { createStore } from 'redux'

const defaultState = {
  tipe: '',
};

//rejuicer
const storeApp = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {...state,
          tipe: action.payload.tipe,
        };
  }
};

export default createStore(storeApp);
