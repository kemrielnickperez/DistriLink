import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import NewNavBarBothSalesCashier from './NewNavBarBothSalesCashier';
import NewAppBar from './NewAppBar';


export default function ContentBothSalesCashier() {
    const location = useLocation();

    const getNavPage = () => {
        const path = location.pathname;
        const navPageMapping: Record<string, string> = {
            '/dashboard': 'Dashboard',
            '/employeeProfile': 'Employee Profile',
            '/paymentList': 'Payment List',
            '/recordDirectPayment': 'Record Direct Payment',
            '/productDistributionList': 'Product Distribution List',
            '/distributorOrderForm': 'Distributor Order Form',
            '/collectorAssignment': 'Collector Assignment',
            '/schedules/:objectId': 'Schedules',
        };
        const navpage = navPageMapping[path] || 'Unknown';
        return navpage;
    };
    const {objectId} =useParams();
    const getNavNamePage=()=>{
      const path=location.pathname;
      const navPageNameMapping: Record<string,string>={
          '/sales&cashierDashboard':'Dashboard',
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
          '/recordDirectPayment':'Record Direct Payment',
          [`/distributorProfileDetails/${objectId}`] :'Distributor Information',
  
      }
      const navpageMapped= navPageNameMapping[path]||'Unknown';
      return navpageMapped;
  }
  const getNavContentPage=()=>{
   
    const path=location.pathname;
  
    const navPageContentMapping: Record<string,string>={
        '/sales&cashierDashboard':'Your pendings overview',
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
        '/recordDirectPayment':'View, Update and Record Direct Payment from your dealer/s',
        [`/distributorProfileDetails/${objectId}`] : `View distributor profile details - ${objectId}`,
      }
    const navpageMapped= navPageContentMapping[path]||'Unknown';
    return navpageMapped;
  }
  

    return (
        <div>
            <NewAppBar moduleName={getNavNamePage()} moduleContent={getNavContentPage()}/>
            <NewNavBarBothSalesCashier moduleName={getNavPage()} />
            <div style={{paddingTop:60}}>
            <Outlet />
            </div>
        </div>
    );
}