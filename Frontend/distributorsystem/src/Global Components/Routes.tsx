import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from "../Components/Module 3 - Distributor Dashboard/DashboardUI";

import PaymentList from "../Components/Module 8 - Payments/PaymentsListUI";
// import DealerProfileList from "./Components/Profiles/DealerProfiles/DealerProfileList";
// import EmployeeProfileDetails from "./Components/Profiles/EmployeeProfiles/EmployeeProfileDetails";
// import EmployeeProfileList from "./Components/Profiles/EmployeeProfiles/EmployeeProfileList";
import DealerRegistration from "../Components/Module 2 - Registrations/DealerRegistrationUI";
import EmployeeRegistration from "../Components/Module 2 - Registrations/EmployeeRegistrationUI";
import Schedules from "../Components/Module 7 - Schedules/ScheduleOrderTransactionUI";
import DistributorOrderForm from "../Components/Module 5 - Product Distribution and Confirmation/DistributorOrderFormUI";
import DealerOrderForm from "../Components/Module 5 - Product Distribution and Confirmation/DealerOrderFormUI";
import SignIn from "../Components/Module 1 - Distributor System Sign-in/SignInUI";
import RecordDirectPayment from "../Components/Module 8 - Payments/RecordDirectPaymentUI";
import Content from "./Contents";
import DataGridOrder from "../Components/Module 6 - Collector Assignment/CollectorAssignmentUI";

import DealerProfile from '../Components/Module 4 - Profiles & Approval/DealerProfilesListUI';
import DealerApproval from '../Components/Module 4 - Profiles & Approval/DealerApproval';
import { OrderTransactionDetails } from '../Components/Module 5 - Product Distribution and Confirmation/OrderTransactionDetails';
import ProductDistributionList from '../Components/Module 5 - Product Distribution and Confirmation/ProductDistributionsListUI';
import NewCollectorAssignment from '../Components/Module 6 - Collector Assignment/NewCollectorAssignment';
import { OrderDetails } from '../Components/Module 6 - Collector Assignment/OrderDetails';
import PaymentTransactionDetails from '../Components/Module 6 - Collector Assignment/PaymentTransactionDetailsUI';
import RecordCollectionPaymentUI from '../Components/Module 8 - Payments/RecordCollectionPaymentUI';
import { PaymentReceiptDetails } from '../Components/Module 8 - Payments/PaymentReceiptDetailsUI';
import DealerProfileDetails from '../Components/Module 4 - Profiles & Approval/DealerProfileDetailsUI';

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Content/>}>
                <Route path="/" element={<Navigate replace to="dashboard"/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/assignmentCollector" element={<DataGridOrder/>}/>
                <Route path="/paymentList" element={<PaymentList/>}/>
                <Route path="/dealearOrderForm" element={<DealerOrderForm/>}/>
                <Route path="/distributorOrderForm" element={<DistributorOrderForm/>}/>
                {/* <Route path="/orderConfirmation" element={<orderConfirmation/>}/> */}
                {/* <Route path="/dealerTransactionDetails" element={<DealerTransactionDetails/>}/> */}
                {/* <Route path="/productDistributionList" element={<ProductDistributionList/>}/> */}
                       
                {/* <Route path="/dealerProfileList" element={<DealerProfileList/>}/> */}
                {/* <Route path="/employeeProfileDetails" element={<EmployeeProfileDetails/>}/>
                <Route path="/employeeProfileList" element={<EmployeeProfileList/>}/> */}
                <Route path="/dealerProfile" element={<DealerProfile/>}/>        
                <Route path="/dealerRegistration" element={<DealerRegistration/>}/>
                <Route path="/employeeRegistrationn" element={<EmployeeRegistration/>}/>
                <Route path="/schedules" element={<Schedules/>}/>
                <Route path="/orderTransactionDetails" element={<OrderTransactionDetails/>}></Route>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/recordDirectPayment" element={<RecordDirectPayment/>}/>
                <Route path="/dealerApproval" element={<DealerApproval/>}/>
                <Route path="/employeeRegistration" element={<EmployeeRegistration/>}/>
                {/* <Route path="/productDistributionList" element={<ProductDistributionList>}/>
                <Route path="/newcollectorAssignment" element={<NewCollectorAssignment/>}/>
                <Route path="/orderDetails" element={<OrderDetails/>}/> */}
                {/* <Route path="/productDistributionList" element={<ProductDistributionList/>}/> */}
                <Route path="/newcollectorAssignment" element={<NewCollectorAssignment/>}/>
                <Route path="/orderDetails/:objectId" element={<OrderDetails/>}/>
                <Route path="/paymentReceiptDetails/:objectId" element={<PaymentReceiptDetails/>}></Route>
                <Route path="/recordCollectionPayment" element={<RecordCollectionPaymentUI/>}/>
                <Route path="/dealerProfileDetails" element={<DealerProfileDetails/>}/>
            </Route>
         </Routes>  
   );
}