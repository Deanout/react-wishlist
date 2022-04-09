import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './features/appbar/AppBar';
import Dashboard from './features/dashboard/Dashboard';
import PrivateRoute from './features/routes/PrivateRoute';
import Login from './features/sessions/Login';
import Signup from './features/sessions/Signup';
import UpdateProfile from './features/sessions/UpdateProfile';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <AppBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
                <Route path="/update-profile" element={
                  <PrivateRoute>
                    <UpdateProfile/>
                  </PrivateRoute>
                }/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
