import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import SignUp from "../../pages/signup/Signup";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not_found/NotFound";
import Library from "../../pages/library/Library";
import Report from "../../pages/report/Report";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Library />} />
        <Route path="report" element={<Report />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
