import { Route, Routes } from "react-router-dom";
import UserHomePage from "../../pages/user/UserHomePage";
import UserSignupPage from "../../pages/user/UserSignupPage";
import UserLoginPage from "../../pages/user/UserLoginPage";


const UserRouter = () => {
    return (
      <div>
        <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/register" element={<UserSignupPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        </Routes>
      </div>
    );
  };
  
  export default UserRouter;