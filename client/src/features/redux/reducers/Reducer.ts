import { combineReducers } from 'redux';
import tokenReducer from '../slice/user/TokenSlice'
import userLoginAuthReducer from '../slice/user/userLoginAuthSlice'
import userDetailsReducer from '../slice/user/UserDetailsSlice';
import employerDetailsReducer from '../slice/employer/employerDetailsSlice';
import employerTokenReducer from '../slice/employer/employerTokenSlice';

const rootReducer = combineReducers({
    token: tokenReducer,
    userDetails: userDetailsReducer,
    userAuth: userLoginAuthReducer,
    employerDetails: employerDetailsReducer,
    employerToken: employerTokenReducer,
  
  });

  export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;