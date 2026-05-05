import { Outlet } from 'react-router-dom';

function HomeLayout() {
  return (
    <div className="flex h-dvh flex-col">
      <nav>네이게이션</nav>
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
      <footer>푸터</footer>
    </div>
  );
}

export default HomeLayout;
