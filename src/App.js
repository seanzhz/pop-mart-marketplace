import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Explore/>}/>
                <Route path='/offers' element={<Offers/>}/>
                <Route path='/profile' element={<PrivateRoute/>}>
                    <Route path='/profile' element={<Profile/>}/>
                </Route>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
            </Routes>
            <Navbar/>
        </Router>
        <ToastContainer position="top-center"/>
    </>
  );
}

export default App;
