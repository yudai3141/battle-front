import Home from "./pages/home/Home";
import Banned from "./pages/banned/Banned";
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


function Layout() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && user.redcard ? (
        <Navigate to="/banned" replace />
      ) : (
        <Outlet />
      )}
    </>
  );
}



function App() {
  const { user } = useContext(AuthContext);
  return (
  <Router>
    <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index element={user ? <Home /> : <Navigate to='/login' />} /> */}
        <Route path='/' element={user ? (user.redcard ? <Banned /> : <Home />) : <Navigate to='/login' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/profile/:username' element={user ? (user.redcard ? <Banned /> : <Profile />) : <Navigate to='/login' />} />
        <Route path='/posts/:id' element={user ?  (user.redcard ? <Banned /> : <PostDetail />) : <Navigate to='/login' />} />
        <Route path="/notifications" element={user ?  (user.redcard ? <Banned /> : <NotificationsPage />) : <Navigate to="/login" />} />
        <Route path='/battles' element={user ?  (user.redcard ? <Banned /> : <BattleListPage />) : <Login />} />
        <Route path="/battles/:battleId" element={user ? (user.redcard ? <Banned /> : <Battle /> ) : <Navigate to="/login" />} />
        <Route path='/battles/:battleId' element={user ?  (user.redcard ? <Banned /> : <Battle />) : <Navigate to='/login' />} />
        <Route path='/banned' element={user ? (user.redcard ? <Banned /> : <Navigate to='/login' />) : <Navigate to='/login' />} />
        <Route path='/battles/:battleId/result' element={user ?  (user.redcard ? <Banned /> : <BattleResult />) : <Navigate to='/login' />} />
      {/* </Route> */}
    </Routes>
  </Router>
  );
}

export default App;
// export default Layout;
