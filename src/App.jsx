import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Create from "./Pages/Create";
import { AppLayout } from "./Layout/AppLayout";
import Auth from "./Auth";

function App() {
  return (
    <Router>
      <Auth>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </Auth>
    </Router>
  );
}

export default App;
