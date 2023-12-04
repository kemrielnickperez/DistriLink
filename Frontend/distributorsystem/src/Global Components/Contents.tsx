import React, { useState } from 'react';
import {Outlet, useLocation, useParams} from 'react-router-dom';
import NewNavBar from './NewNavBar';
import { AppBar, Container, Toolbar } from '@mui/material';
import NewAppBar from './NewAppBar';


export default function Content() {
  const location = useLocation();
  const {objectId} =useParams();
  const getNavNamePage=()=>{
    const path=location.pathname;
    const navPageNameMapping: Record<string,string>={
        '/dashboard':'Dashboard',
        '/collectorAssignment':'Collector Assignment',
        '/dealerProfileList': 'Dealer Profiles List',
        '/employeeProfileList': 'Employee Profiles List',
        '/productDistributionList':'Product Distribution List',
        '/paymentList':'Payment Receipts',
        '/distributorOrderForm': 'Product Distribution Form',
        '/dealerOrderForm':'Product Distribution Form',
        [`/dealerProfileDetails/${objectId}`] : 'Dealer Information',
        [`/employeeProfileDetails/${objectId}`] : 'Employee Information',
        [`/orderDetails/${objectId}`] : 'Order Transaction Details',
        [`/orderTransactionDetails/${objectId}`] : 'Order Transaction Details',
        [`/paymentReceiptDetails/${objectId}`] : 'Payment Receipt Details',
        [`/schedules/${objectId}`] : 'Schedule',
        '/recordDirectPayment':'Record Direct Payment'
    }
    const navpageMapped= navPageNameMapping[path]||'Unknown';
    return navpageMapped;
}
const getNavContentPage=()=>{
 
  const path=location.pathname;

  const navPageContentMapping: Record<string,string>={
      '/dashboard':'Your pendings overview',
      '/collectorAssignment':'Assign, reassign, or unassign collector to your order',
      '/dealerProfileList': 'View unconfirmed & confirmed Dealers, awaiting for your confirmation.',
      '/employeeProfileList': 'List of your emplooyes',
      '/productDistributionList':'View confirmed & pending product orders from your dealers, awaiting for your confirmation.',
      '/paymentList':"List of Dealer's Payment Receipts",
      '/distributorOrderForm': "Allocate a product to generate a dealer's order.",
      '/dealerOrderForm':'Allocate a product to generate a your order.',
      [`/dealerProfileDetails/${objectId}`]  : `View dealer profile details - ${objectId}`,
      [`/employeeProfileDetails/${objectId}`] : `View employee profile details - ${objectId}`,
      [`/orderDetails/${objectId}`] : `View dealer's order transaction details - Order Transaction ID: ${objectId}`,
      [`/orderTransactionDetails/${objectId}`] : `View dealer's order transaction details - Order Transaction ID:  ${objectId}`  ,
      [`/paymentReceiptDetails/${objectId}`] : `View payment receipt details - Receipt ID : ${objectId}`,
      [`/schedules/${objectId}`] : `Set schedule of due date/s on dealer's order transaction`,
      '/recordDirectPayment':'View, Update and Record Direct Payment from your dealer/s'
    }
  const navpageMapped= navPageContentMapping[path]||'Unknown';
  return navpageMapped;
}

    return (
      <div>
        <NewAppBar moduleName={getNavNamePage()} moduleContent={getNavContentPage()}/>
        <NewNavBar/>   
        <div style={{paddingTop:60}}>
         <Outlet/>
        </div>
      </div>
    );
}