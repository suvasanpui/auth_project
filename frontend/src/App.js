import logo from './logo.svg';
import './App.css';
import { Navigate, Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler'

function App() {


  //set private route , this is responsible for when i frist go then only login route is used do not access a home route
  const [isAuthenticate,setIsauthenticate]=useState(false);
  const PrivateRoute=({element})=>{
    return isAuthenticate ? element : <Navigate to='/login'/>
  }

  return (
    <div>
    <RefreshHandler setIsauthenticate={setIsauthenticate}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
