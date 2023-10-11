import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from './Global Components/Routes';
import SignupScreen from './Components/B - Registration(SplashScreen)/SignupScreen';
import NewDealerRegistration from './Components/Module 2 - Registrations/NewDealerRegistration';
import NewEmployeeRegistration from './Components/Module 2 - Registrations/NewEmployeeRegistration';
import RoutesSignUp from './Global Components/RoutesSignUp';

function App() {
  return (
    <div className="App">
         {/* <SignupScreen/> */}
        <MainRoutes/> 
       {/* <RoutesSignUp/> */}
       {/* <NewDealerRegistration/>  */}
      {/* <NewEmployeeRegistration/> */}
   </div>
  );
}

export default App;
