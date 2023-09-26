import { Route, Routes } from "react-router-dom";
import AdminLoginForm from "../../components/admin/Login/AdminLogin";
import { Admin } from "../../pages/admin/adminDash";
import Dashboard from "../../components/Employer/Employer/Dashboard";
import AdminUser from "../../components/admin/Body/pages/AdminUser";
import AdminEmployer from "../../components/admin/Body/pages/AdminEmployer";
import AdminEmployerVerification from "../../components/admin/Body/pages/AdminEmployerVerification";
const AdminRouter = () => {
    return (
      <div>
        <Routes>
       <Route path="/login" element={<AdminLoginForm />} />
       <Route path="" element={<Admin />}>
       <Route index element={<Dashboard />} />
       <Route path="/users" element={<AdminUser />} />
       <Route path="/employers" element={<AdminEmployer />} />
       <Route path="/admin-verification" element={<AdminEmployerVerification />} />
      </Route>
</Routes>
      </div>
    );
  };
  export default AdminRouter