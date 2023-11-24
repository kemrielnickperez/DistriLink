import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewNavBarCashier from './NewNavBarCashier';


export default function ContentCashier() {
    const location = useLocation();

    const getNavPage = () => {
        const path = location.pathname;
        const navPageMapping: Record<string, string> = {
            '/dashboard': 'Dashboard',
            '/employeeProfile': 'Employee Profile',
            '/paymentList': 'Payment List',
            '/recordDirectPayment': 'Record Direct Payment',
        };
        const navpage = navPageMapping[path] || 'Unknown';
        return navpage;
    };

    return (
        <div>
            <NewNavBarCashier moduleName={getNavPage()} />
            <Outlet />
        </div>
    );
}