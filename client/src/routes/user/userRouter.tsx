import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";


const UserRouter = () => {
    return (
      <div>
        <Routes>
        
          <Route path="/login" element={<UserLoginPage />} />
          
        </Routes>
      </div>
    );
  };
  
  export default UserRouter;