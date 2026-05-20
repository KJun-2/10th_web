import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomeLayout() {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <main className="flex-1 mt-16">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
