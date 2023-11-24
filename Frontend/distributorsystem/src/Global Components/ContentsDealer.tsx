import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewNavBar from './NewNavBar';
import NewNavBarDealer from './NewNavBarDealer';


export default function ContentDealer() {
    const location = useLocation();

    const getNavPage = () => {
        const path = location.pathname;
        const navPageMapping: Record<string, string> = {
            '/dashboard': 'Dashboard',
            '/dealerProfile': 'Dealer Profile',
            '/dealerOrderForm': 'Dealer Order Form',
        };
        const navpage = navPageMapping[path] || 'Unknown';
        return navpage;
    };

    return (
        <div>
            <NewNavBarDealer moduleName={getNavPage()} />
            <Outlet />
        </div>
    );
}