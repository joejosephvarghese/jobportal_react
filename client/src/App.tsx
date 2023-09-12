import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/userRouter";
import HomeRouter from "./routes/user/home/HomeRouter";
import EmployerRouter from "./routes/employer/EmployerRouter";
import "./App.css";
import JobRouter from "./routes/jobs/JobRouter";
import ApplicationRouter from "./routes/applications/applicationRouter";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
        <Route path="/*" element={<HomeRouter />} />
          <Route path="/user/*"  element={<UserRouter />} />
          <Route path="/employer/*" element={<EmployerRouter />} />
          <Route path="/job/*" element={<JobRouter/>}/>
          <Route path="/application/*" element={<ApplicationRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
