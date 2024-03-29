import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import BottomBar from './BottomBar';

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'About') {
      return <About />;
    } 
    if (currentPage === 'Portfolio') {
      return <Portfolio />;
    }
    return <Contact />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className='top-content mw-100'>
      <div className='p-3 text-white g-col-8'>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>

      <div className='main-content'>
        {renderPage()}
      </div>
    <div className='bottom-content'>
      <BottomBar/>
    </div>
    </div>
  );
}
