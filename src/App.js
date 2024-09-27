import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import PostDetail from "./pages/postDetail/PostDetail";
import NotificationsPage from "./pages/notificationsPage/NotificationsPage";
import Battle from "./pages/battle/Battle";
import BattleListPage from "./pages/battleListPage/BattleListPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./state/AuthContext";
import { useContext } from "react";
import BattleResult from "./pages/battleResult/BattleResult";


function App() {
  const { user } = useContext(AuthContext);
  return (
  <Router>
    <Routes>
    <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/profile/:username' element={user ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/posts/:id' element={user ? <PostDetail /> : <Navigate to='/login' />} />
        <Route path="/notifications" element={user ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path='/battles' element={user ? <BattleListPage /> : <Login />} />
        <Route path="/battles/:battleId" element={user ? <Battle /> : <Navigate to="/login" />} />
        <Route path='/battles/:battleId' element={user ? <Battle /> : <Navigate to='/login' />} />
        <Route path='/battles/:battleId/result' element={user ? <BattleResult /> : <Navigate to='/login' />} />
    </Routes>
  </Router>
  );
}

export default App;
