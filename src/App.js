import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forgetpassword from "./components/ForgetPassword";
import Resetpassword from "./components/ResetPassword";
import Gallery from "./components/Gallery";
import AddPhoto from "./components/AddPhoto";
import EditPhoto from "./components/EditPhoto";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<Forgetpassword />} />
        <Route path="/reset-password/:resetToken" element={<Resetpassword />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/add-photo" element={<AddPhoto />} />
        <Route path="/edit-photo/:id" element={<EditPhoto />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
