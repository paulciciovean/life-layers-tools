import React from 'react';
import Navbar from './Navbar';


export const Layout = ({ children }) => {
  return (
    <div style={{ height: "100%" , background: "linear-gradient(to bottom, #8c8c8c, #cfcfcf, #ff8c00)" , paddingTop: '80px'}}>
      <Navbar />
      <div style={{ height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
