import { createStore } from 'redux'

const defaultState = {
  isLogin: false,
  uid: '',
  member_id: '',

  isLoading:false,

  type_temp: '',
  email_temp: '',
  password_temp: '',
  name_temp: '',
  phone_temp: '',

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
    case 'NEWMEMBER':
      return {...state,
          type_temp: action.payload.type_temp,
          email_temp: action.payload.email_temp,
          password_temp: action.payload.password_temp,
          name_temp: action.payload.name_temp,
          phone_temp: action.payload.phone_temp,
          member_id: action.payload.member_id,
        };
    case 'LOADING':
      return {...state,
          isLoading: action.payload.isLoading,
        };
  }
};

export default createStore(storeApp);
