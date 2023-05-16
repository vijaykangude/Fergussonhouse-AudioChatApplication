import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';


function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={ <GuestRoute> <Home /> </GuestRoute>} />
                <Route path="/authenticate" element={<GuestRoute><Authenticate /></GuestRoute>} />
                <Route path="/activate" element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />
                <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}


const GuestRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return isAuth ? (<Navigate to="/activate" replace />) : children;
};

const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return !isAuth ? (<Navigate to="/" replace />) : (isAuth && !user.activated) ? (children ) : <Navigate to="/rooms" replace />;

};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return !isAuth ? (<Navigate to="/" replace />) : ( isAuth && !user.activated) ? <Navigate to="/activate" replace /> : children;

};

export default App;
