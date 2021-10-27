import { createStore } from 'redux'

const defaultState = {
  isLogin: false,
  uid: '',
  member_id: '',

  isLoading:false,

};

//rejuicer
const storeApp = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {...state,
          isLogin: action.payload.isLogin,
          uid: action.payload.uid,
          member_id: action.payload.member_id,
        };
    case 'LOADING':
      return {...state,
          isLoading: action.payload.isLoading,
        };
  }
};

export default createStore(storeApp);
