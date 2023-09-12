import { Route, Routes } from "react-router-dom";
import UserHomePage from "../../pages/user/UserHomePage";
import UserSignupPage from "../../pages/user/UserSignupPage";
import UserLoginPage from "../../pages/user/UserLoginPage";
import UserJobApplicationsPage from "../../pages/user/UserJobApplications";

const UserRouter = () => {
    return (
      <div>
       <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserSignupPage />} />
        <Route path="/all-applications" element= {<UserJobApplicationsPage/>} />
      </Routes>
      </div>
    );
  };
  
  export default UserRouter;