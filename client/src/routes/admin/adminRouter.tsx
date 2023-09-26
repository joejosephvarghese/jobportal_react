import { Route, Routes } from "react-router-dom";
import AdminLoginForm from "../../components/admin/Login/AdminLogin";
import { Admin } from "../../pages/admin/adminDash";

const AdminRouter = () => {
    return (
      <div>
        <Routes>
       <Route path="/login" element={<AdminLoginForm />} />
       <Route path="" element={<Admin />}>
        
      </Route>
</Routes>
      </div>
    );
  };
  export default AdminRouter