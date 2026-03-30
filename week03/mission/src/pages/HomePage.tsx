import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default HomePage;
