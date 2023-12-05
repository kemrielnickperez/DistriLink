import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewNavBarBothSalesCashier from './NewNavBarBothSalesCashier';


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

    return (
        <div>
            <NewNavBarBothSalesCashier moduleName={getNavPage()} />
            <Outlet />
        </div>
    );
}