import { Routes, Route, Navigate } from 'react-router-dom'
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

import DealerProfile from '../Components/Module 4 - Profiles & Approval/DealerProfilesListUI';
import DealerApproval from '../Components/Module 4 - Profiles & Approval/DealerApproval';
import ProductDistributionList from '../Components/Module 5 - Product Distribution and Confirmation/ProductDistributionsListUI';
import { OrderDetails } from '../Components/Module 6 - Collector Assignment/OrderDetails';

import RecordCollectionPaymentUI from '../Components/Module 8 - Payments/RecordCollectionPaymentUI';
import { PaymentReceiptDetails } from '../Components/Module 8 - Payments/PaymentReceiptDetailsUI';

import SignupScreen from '../Components/B - Registration(SplashScreen)/SignupScreen';
import SignInContent from './ContentsSignIn';
import SignUpContent from './ContentsSignUp';
import SplashscreenContent from './ContentsSplashscreen';
import WelcomeScreen from '../Components/A - SplashScreen/WelcomeScreen';
import DealerProfileDetails from '../Components/Module 4 - Profiles & Approval/DealerProfileDetailsUI';
import CollectorAssignment from '../Components/Module 6 - Collector Assignment/CollectorAssignmentUI';
import EmployeeProfileListUI from '../Components/Module 4 - Profiles & Approval/EmployeeProfilesListUI';
import DealerProfileListUI from '../Components/Module 4 - Profiles & Approval/DealerProfilesListUI';
import { EmployeeProfileDetails } from '../Components/Module 4 - Profiles & Approval/EmployeeProfileDetailsUI';
import OrderConfirmation from '../Components/Module 5 - Product Distribution and Confirmation/OrderConfirmationUI';
import { OrderTransactionDetails } from '../Components/Module 5 - Product Distribution and Confirmation/OrderTransactionDetails';
import DistributorRegistration from '../Components/Module 2 - Registrations/DistributorRegistrationUI';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ContentDealer from './ContentsDealer';
import ContentSalesAssociate from './ContentsSalesAssociate';
import ContentCashier from './ContentsCashier';
import ContentBothSalesCashier from './ContentsBothSalesCashier';

export default function MainRoutes() {

    const user = JSON.parse(localStorage.getItem('user')!) || {};

    return (
        <Routes>
            <Route path="/" element={<SplashscreenContent />}>
                <Route path="/" element={<Navigate replace to="WelcomeScreen" />} />
                <Route path="/WelcomeScreen" element={<WelcomeScreen />} />
                {/* <SignupScreen/> */}
                <Route path="/" element={<SignUpContent />}>
                    <Route path="/" element={<Navigate replace to="SignUpScreen" />} />
                    <Route path="/SignUpScreen" element={<SignupScreen />} />
                    <Route path="/DealerRegistration" element={<DealerRegistration />} />
                    <Route path="/EmployeeRegistration" element={<EmployeeRegistration />} />
                    <Route path="/DistributorRegistration" element={<DistributorRegistration />} />
                </Route>

                {/* <SigninScreen/> */}
                <Route path="/" element={<SignInContent />}>
                    <Route path="/" element={<Navigate replace to="SignIn" />} />
                    <Route path="/SignIn" element={<SignIn />} />

                    {user && user!.tableName === "Dealer" && (
                        <Route path="/" element={<ContentDealer />}>
                            <Route path="/" element={<Navigate replace to="dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dealerProfile" element={<DealerProfile />} />
                            <Route path="/dealerOrderForm" element={<DealerOrderForm />} />
                        </Route>
                    )}

                    {user && user!.tableName === "Distributor" && (
                        <Route path="/" element={<Content />}>
                            <Route path="/" element={<Navigate replace to="dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/paymentList" element={<PaymentList />} />

                           {/*  <Route path="/dealerOrderForm" element={<DealerOrderForm />} /> */}
                            <Route path="/distributorOrderForm" element={<DistributorOrderForm />} />
                            <Route path="/orderConfirmation/:objectId" element={<OrderConfirmation />} />
                            <Route path="/productDistributionList" element={<ProductDistributionList />} />
                            <Route path="/orderTransactionDetails/:objectId" element={<OrderTransactionDetails />} />

                            <Route path="/dealerProfileList" element={<DealerProfileListUI />} />
                            <Route path="/dealerProfileDetails/:objectId" element={<DealerProfileDetails />}></Route>
                            <Route path="/dealerRegistration" element={<DealerRegistration />} />

                            <Route path="/employeeProfileList" element={<EmployeeProfileListUI />} />
                            <Route path="/employeeProfileDetails/:objectId" element={<EmployeeProfileDetails />}></Route>
                            <Route path="/employeeRegistrationn" element={<EmployeeRegistration />} />

                            <Route path="/schedules/:objectId" element={<Schedules />} />

                            <Route path="/recordDirectPayment" element={<RecordDirectPayment />} />
                            <Route path="/dealerApproval" element={<DealerApproval />} />
                            <Route path="/employeeRegistration" element={<EmployeeRegistration />} />

                            <Route path="/collectorAssignment" element={<CollectorAssignment />} />
                            <Route path="/orderDetails/:objectId" element={<OrderDetails />} />
                            <Route path="/paymentReceiptDetails/:objectId" element={<PaymentReceiptDetails />}></Route>
                            <Route path="/recordCollectionPayment" element={<RecordCollectionPaymentUI />} />
                        </Route>
                    )}

                    {user && user!.tableName === "Sales Associate" && (
                        <Route path="/" element={<ContentSalesAssociate />}>
                            <Route path="/" element={<Navigate replace to="dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/employeeProfile" element={<EmployeeProfileDetails />} />
                            <Route path="/productDistributionList" element={<ProductDistributionList />} />
                            <Route path="/distributorOrderForm" element={<DistributorOrderForm />} />
                            <Route path="/collectorAssignment" element={<CollectorAssignment />} />
                            <Route path="/schedules/:objectId" element={<Schedules />} />
                        </Route>
                    )}

                    {user && user!.tableName === "Cashier" && (
                        <Route path="/" element={<ContentCashier />}>
                            <Route path="/" element={<Navigate replace to="dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/employeeProfile" element={<EmployeeProfileDetails />} />
                            <Route path="/paymentList" element={<PaymentList />} />
                            <Route path="/recordDirectPayment" element={<RecordDirectPayment />} />
                        </Route>
                    )}

                    {user && user!.tableName === "Sales Associate and Cashier" && (
                        <Route path="/" element={<ContentBothSalesCashier />}>
                            <Route path="/" element={<Navigate replace to="dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/employeeProfile" element={<EmployeeProfileDetails />} />
                            <Route path="/productDistributionList" element={<ProductDistributionList />} />
                            <Route path="/distributorOrderForm" element={<DistributorOrderForm />} />
                            <Route path="/collectorAssignment" element={<CollectorAssignment />} />
                            <Route path="/schedules/:objectId" element={<Schedules />} />
                            <Route path="/paymentList" element={<PaymentList />} />
                            <Route path="/recordDirectPayment" element={<RecordDirectPayment />} />
                        </Route>
                    )}

                </Route>
            </Route>
        </Routes>
    )
}