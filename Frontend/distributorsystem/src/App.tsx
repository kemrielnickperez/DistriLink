import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from './Global Components/Routes';
import NewNavBar from './Global Components/NewNavBar';
import SignupScreen from './Components/B - Registration(SplashScreen)/SignupScreen';
import NewDealerRegistration from './Components/Module 2 - Registrations/DealerRegistrationUI';
import NewEmployeeRegistration from './Components/Module 2 - Registrations/EmployeeRegistrationUI';
import RoutesSignUp from './Global Components/RoutesSignUp';

function App() {
  return (
    <div className="App">
       <AppProvider>
          <MainRoutes/> 
      </AppProvider> 
      
      
       {/* <NewDealerRegistration/>  */}
      {/* <NewEmployeeRegistration/> */}
   </div>
  );
}

export default App;
