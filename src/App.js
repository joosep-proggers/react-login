import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Register from './components/Register/Register';
import AuthContext from './store/auth-context';

function App() {
  
  const ctx = useContext(AuthContext)

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={ctx.isLoggedIn}/>
      <main>
        {ctx.showLogin && !ctx.isLoggedIn && <Login/>}
        {ctx.showRegister && !ctx.isLoggedIn && <Register/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>
  );
}

export default App;