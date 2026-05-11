import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return (
      <Navigate
        to={'/login'}
        replace
      />
    );
  }

  return (
    <>
      <Navbar />
      <main className="p-16 h-dvh">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
