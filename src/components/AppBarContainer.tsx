import { useRouter } from 'next/router';

import AppBar, { Item } from "./AppBar";

export default function AppBarContainer() {
  const router = useRouter();

  const itemSelected = (item: Item) => {
    switch (item) {
    case 'Logout': console.log('+++LOGOUT');
      break;
    case 'Dashboard': router.push('/');
      break;
    case 'Profile': router.push('/company-details');
      break;
    case 'Clients': router.push('/clients');
      break;
    case 'Invoices': router.push('/invoices');
      break;

    default:
      throw new Error(`Unknown nav item ${item}`);
    }
  };

  return (
    <AppBar 
      activeItemName={router.route.substring(router.route.indexOf('/') + 1)} 
      user={{email: 'test@test.com'}} 
      itemSelected={itemSelected} 
    /> 
  );
};