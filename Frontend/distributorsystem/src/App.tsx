import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from './Global Components/Routes';
import SignupScreen from './Components/B - Registration(SplashScreen)/SignupScreen';
import NewDealerRegistration from './Components/Module 2 - Registrations/NewDealerRegistration';
import NewEmployeeRegistration from './Components/Module 2 - Registrations/NewEmployeeRegistration';

function App() {
  return (
    <div className="App">
        {/* <SignupScreen/> */}
       <MainRoutes/> 
       {/* <NewDealerRegistration/>  */}
      {/* <NewEmployeeRegistration/> */}
   </div>
  );
}

export default App;
