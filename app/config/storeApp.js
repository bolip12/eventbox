import { createStore } from 'redux'

const defaultState = {
  tipe: '',

  isLoading:false,

};

//rejuicer
const storeApp = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {...state,
          tipe: action.payload.tipe,
        };
    case 'LOADING':
      return {...state,
          isLoading: action.payload.isLoading,
        };
  }
};

export default createStore(storeApp);
