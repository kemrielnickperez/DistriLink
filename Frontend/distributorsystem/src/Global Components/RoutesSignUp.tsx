import { Navigate, Route, Routes } from "react-router-dom";
import Content from "./Contents";

import SignupScreen from "../Components/B - Registration(SplashScreen)/SignupScreen";
import SignUpContent from "./ContentsSignIn";
import NewDealerRegistration from "../Components/Module 2 - Registrations/DealerRegistrationUI";
import NewEmployeeRegistration from "../Components/Module 2 - Registrations/EmployeeRegistrationUI";
import MainRoutes from "./Routes";
import NewNavBar from "./NewNavBar";
import { Dashboard } from "@mui/icons-material";
import PaymentList from "../Components/Module 8 - Payments/PaymentsListUI";
import DealerOrderForm from "../Components/Module 5 - Product Distribution and Confirmation/DealerOrderFormUI";
import DistributorOrderForm from "../Components/Module 5 - Product Distribution and Confirmation/DistributorOrderFormUI";
import DealerProfile from "../Components/Module 4 - Profiles & Approval/DealerProfilesListUI";
import DealerRegistration from "../Components/Module 2 - Registrations/DealerRegistrationUI";
import EmployeeRegistration from "../Components/Module 2 - Registrations/EmployeeRegistrationUI";
import Schedules from "../Components/Module 7 - Schedules/ScheduleOrderTransactionUI";
import PaymentTransactionDetails from "../Components/Module 6 - Collector Assignment/PaymentTransactionDetailsUI";
import RecordDirectPayment from "../Components/Module 8 - Payments/RecordDirectPaymentUI";
import SignIn from "../Components/Module 1 - Distributor System Sign-in/SignInUI";
import DealerApproval from "../Components/Module 4 - Profiles & Approval/DealerApproval";
import NewCollectorAssignment from "../Components/Module 6 - Collector Assignment/NewCollectorAssignment";
import { OrderDetails } from "../Components/Module 6 - Collector Assignment/OrderDetails";
import { PaymentReceiptDetails } from "../Components/Module 8 - Payments/PaymentReceiptDetailsUI";
import RecordCollectionPaymentUI from "../Components/Module 8 - Payments/RecordCollectionPaymentUI";
import SignInContent from "./ContentsSignIn";

export default function SignUpRoutes(){
    return(
        <Routes>
            <Route path="/" element={<SignInContent/>}>
                <Route path="/" element={<Navigate replace to="SignIn"/>}/>
                 {/* <SignupScreen/> */}
                <Route path="/SignUpScreen" element={<SignupScreen/>}/>
                <Route path="/newDealerRegistration" element={<NewDealerRegistration/>}/>
                <Route path="/newEmployeeRegistration" element={<NewEmployeeRegistration/>}/>
                 {/* <SignInScreen/> */}
                <Route path="/SignIn" element={<SignIn/>}/>
                     {/* <Main Routes/> */}
                    <Route path="/" element={<Content/>}>
                            <Route path="/" element={<Navigate replace to="dashboard"/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/paymentList" element={<PaymentList/>}/>
                            <Route path="/dealearOrderForm" element={<DealerOrderForm/>}/>
                            <Route path="/distributorOrderForm" element={<DistributorOrderForm/>}/>
                            <Route path="/dealerProfile" element={<DealerProfile/>}/>        
                            <Route path="/dealerRegistration" element={<DealerRegistration/>}/>
                            <Route path="/employeeRegistrationn" element={<EmployeeRegistration/>}/>
                            <Route path="/schedules" element={<Schedules/>}/>
                            <Route path="/orderTransactionDetails" element={<PaymentTransactionDetails/>}></Route>
                            <Route path="/signin" element={<SignIn/>}/>
                            <Route path="/recordDirectPayment" element={<RecordDirectPayment/>}/>
                            <Route path="/dealerApproval" element={<DealerApproval/>}/>
                            <Route path="/employeeRegistration" element={<EmployeeRegistration/>}/>
                            <Route path="/newcollectorAssignment" element={<NewCollectorAssignment/>}/>
                            <Route path="/orderDetails/:objectId" element={<OrderDetails/>}/>
                            <Route path="/paymentReceiptDetails/:objectId" element={<PaymentReceiptDetails/>}></Route>
                            <Route path="/recordCollectionPayment" element={<RecordCollectionPaymentUI/>}/>
                    </Route>
            </Route>  
        </Routes>
    );
}