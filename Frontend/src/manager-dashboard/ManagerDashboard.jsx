import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/shared/Layout';
import Home from './Pages/Home';
import Projects from "./Pages/Projects";
import Users from "./Pages/Users";
import Donations from "./Pages/Donations";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {

  return (
   <>
  <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users" element={<Users/>}/>
          <Route path="donations" element={<Donations/>}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
   </>
  )
}

export default App
