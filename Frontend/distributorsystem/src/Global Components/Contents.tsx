import React, { useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import NewNavBar from './NewNavBar';
import { AppBar, Container, Toolbar } from '@mui/material';
import NewAppBar from './NewAppBar';


export default function Content() {
  const location = useLocation();
  const {objectId} = useParams();

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
        '/recordDirectPayment':'Record Direct Payment',
        [`/distributorProfileDetails/${objectId}`] :'Distributor Information',

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
      '/recordDirectPayment':"Set dealer's direct payments to record"
      
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