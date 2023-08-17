import { combineReducers } from 'redux';
import tokenReducer from '../slice/user/TokenSlice'
import userLoginAuthReducer from '../slice/user/userLoginAuthSlice'
import userDetailsReducer from '../slice/user/UserDetailsSlice';
const rootReducer = combineReducers({
    token: tokenReducer,
    userDetails: userDetailsReducer,
 
    userAuth: userLoginAuthReducer,
   
  });

  export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;