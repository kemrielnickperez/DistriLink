import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from './Global Components/Routes';
import AppProvider from './Global Components/AppContext';

function App() {
  return (
    <div className="App">
       <AppProvider>
        <MainRoutes/>
      </AppProvider> 
      
      
    </div>
  );
}

export default App;
