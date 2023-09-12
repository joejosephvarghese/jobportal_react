import { combineReducers } from 'redux';
import tokenReducer from '../slice/user/TokenSlice'
import userLoginAuthReducer from '../slice/user/userLoginAuthSlice'
import userDetailsReducer from '../slice/user/UserDetailsSlice';
import employerDetailsReducer from '../slice/employer/employerDetailsSlice';
import employerTokenReducer from '../slice/employer/employerTokenSlice';
import employerJobsReducer from '../slice/employer/employerJobsSlice';
import allJobReducer from '../slice/user/getAllJobsSlice';
import jobDetailReducer from '../slice/user/jobDetailsSlice';
import employerJobDetailReducer from '../slice/employer/employerJobDetailsSlice';
import userAllApplicationReducer from '../slice/user/allApplicationSlice';
import userApplicationDetailsReducer from '../slice/user/userApplicationDetailsSlice';
const rootReducer = combineReducers({
    token: tokenReducer,
    userDetails: userDetailsReducer,
    userAuth: userLoginAuthReducer,
    employerDetails: employerDetailsReducer,
    employerToken: employerTokenReducer,
    employerJobs: employerJobsReducer,
    allJobs: allJobReducer,
    employerJobDetails: employerJobDetailReducer,
    jobDetails: jobDetailReducer,
    userApplications: userAllApplicationReducer,
    applicationDetails: userApplicationDetailsReducer
  });

  export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;