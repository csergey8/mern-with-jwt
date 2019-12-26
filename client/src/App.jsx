import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import 'materialize-css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';


function App() {
  const { token, login, logOut, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logOut, userId, isAuthenticated
    }}>
      <BrowserRouter>
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
