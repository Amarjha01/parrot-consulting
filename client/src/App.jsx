import { Outlet } from 'react-router-dom';
import Navbar from './components/global/navbar';
import Footer from './components/global/footer';

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
