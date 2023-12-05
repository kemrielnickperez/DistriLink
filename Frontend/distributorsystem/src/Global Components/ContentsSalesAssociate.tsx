import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewNavBar from './NewNavBar';
import NewNavBarDealer from './NewNavBarDealer';
import NewNavBarSalesAssociate from './NewNavBarSalesAssociate';


export default function ContentSalesAssociate() {
    const location = useLocation();

    const getNavPage = () => {
        const path = location.pathname;
        const navPageMapping: Record<string, string> = {
            '/dashboard': 'Dashboard',
            '/employeeProfile': 'Employee Profile',
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
            <NewNavBarSalesAssociate moduleName={getNavPage()} />
            <Outlet />
        </div>
    );
}