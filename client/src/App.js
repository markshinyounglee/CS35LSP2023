import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              // Route handling on the client side is done by react-router-dom
              // This path corresponds to the home page. If you want to make a 
              // new page, just create a new file in pages to handle rendering the page
              // and fetching data, import that file, then set the path to whatever you want like done below. 
              path="/" element={<Home />} // has a path of //localhost:3000
              // path="/beef" element={<Beef/>} would have a path of //localhost:3000/beef in the browser
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
