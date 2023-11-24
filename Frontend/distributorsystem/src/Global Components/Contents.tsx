import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewNavBar from './NewNavBar';


export default function Content() {
  const location = useLocation();

  const getNavPage = () => {
    const path = location.pathname;
    const navPageMapping: Record<string, string> = {
      '/dashboard': 'Dashboard',
      //'/assignmentCollector': 'Collector Assignment',
      //'/dealerRegistration':'Dealer Registration',
      //'/dealerApproval':'Dealer Approval',

      '/schedules': 'Payment Transaction Schedule',
      '/orderTransactionDetails': 'Order Transaction Details',
      '/printDetails': 'Print Details',
      '/paymentList': 'Payment Lists',
      '/recordDirectPayment': 'Record Direct Payment',

      //'/distributorOrderForm':'Distribution Order Form',
      //'/orderConfirmation': 'Order Confrimation',
      //'/paymentSummary':'Payment Summary',

      //'/dealerProfile':'Dealer Profile',
      // '/dealerApproval':'Dealer Approval'
      '/productDistributionList': 'Product Distribution List'

    };

    const navpage = navPageMapping[path] || 'Unknown';
    return navpage;
  };

  return (
    <div>
      <NewNavBar moduleName={getNavPage()} />
      <Outlet />
    </div>
  );
}