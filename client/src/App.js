import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';

// create local user variable (login initializes this)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/" element={<Home />}         
            />
            <Route
              path="/login" element={<Login />}
            />
            <Route
              path="/create-account" element={<Signup/>}
            />
            <Route
              // pass user variable into here
              path="/profile" element={<ProfilePage/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
