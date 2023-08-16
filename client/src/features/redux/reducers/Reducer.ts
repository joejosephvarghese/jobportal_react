import { combineReducers } from 'redux';
import tokenReducer from '../slice/user/TokenSlice'
import userLoginAuthReducer from '../slice/user/userLoginAuthSlice'
const rootReducer = combineReducers({
    token: tokenReducer,
  
 
    userAuth: userLoginAuthReducer,
   
  });

  export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;