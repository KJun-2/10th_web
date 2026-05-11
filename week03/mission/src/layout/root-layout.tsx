import Navbar from '../pages/Navbar'
import { Outlet } from 'react-router-dom'
export const RootLayout = ()=> {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>  );
};

