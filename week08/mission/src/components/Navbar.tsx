import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hamburgar from './Hamburgar';
import useSidebar from '../hooks/useSidebar';
import Sidebar from './Sidebar';

function Navbar() {
  const { accessToken } = useAuth();
  const { toggle, isOpen, close } = useSidebar();
  console.log(isOpen);
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10 ">
      <div className="flex item-center justify-between p-4">
        <div>
            
        <Hamburgar toggle={toggle}/>

        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white ml-5">
          돌림판
        </Link>
        <Sidebar isOpen={isOpen} onClose={close}/>
            </div> 
        <>
          {!accessToken && (
            <div className="space-x-6">
              <Link
                to={'/login'}
                className="text-gray-700 dark:text-gary-300 hover:text-blue-500">
                로그인
              </Link>
              <Link
                to={'/signup'}
                className="text-gray-700 dark:text-gary-300 hover:text-blue-500">
                회원가입
              </Link>
            </div>
          )}
        </>
        <>
          {accessToken && (
            <div className="space-x-6">
              <Link
                to={'/mypage'}
                className="text-gray-700 dark:text-gary-300 hover:text-blue-500">
                마이페이지
              </Link>
              <Link
                to={'/search'}
                className="text-gray-700 dark:text-gary-300 hover:text-blue-500">
                검색
              </Link>
            </div>
          )}
        </>
      </div>
    </nav>
  );
}

export default Navbar;
