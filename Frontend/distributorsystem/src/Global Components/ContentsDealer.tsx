import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import NewNavBarDealer from './NewNavBarDealer';
import NewAppBar from './NewAppBar';


export default function ContentDealer() {
    const location = useLocation();

    const getNavPageDealer = () => {
        const path = location.pathname;
        const navPageMapping: Record<string, string> = {
            '/dealerProfile': 'Dealer Profile',
            '/dealerOrderForm': 'Dealer Order Form',
        };
        const navpage = navPageMapping[path] || 'Unknown';
        return navpage;
    };
    const {objectId} =useParams();
    const getNavNamePage=()=>{
      const path=location.pathname;
      const navPageNameMapping: Record<string,string>={
          '/dealerOrderForm':'Product Distribution Form',
          [`/dealerProfileDetails/${objectId}`] : 'Dealer Information',
         
      }
      const navpageMapped= navPageNameMapping[path]||'Unknown';
      return navpageMapped;
  }
  const getNavContentPage=()=>{
   
    const path=location.pathname;
  
    const navPageContentMapping: Record<string,string>={
        '/dealerOrderForm':'Allocate a product to generate a your order.',
        [`/dealerProfileDetails/${objectId}`]  : `View dealer profile details - ${objectId}`,
         }
    const navpageMapped= navPageContentMapping[path]||'Unknown';
    return navpageMapped;
  }
  

    return (
        <div>
            <NewAppBar moduleName={getNavNamePage()} moduleContent={getNavContentPage()}/>
        
            <NewNavBarDealer moduleName={getNavPageDealer()} />
            <div style={{paddingTop:60}}>
            <Outlet />
            </div>
        </div>
    );
}