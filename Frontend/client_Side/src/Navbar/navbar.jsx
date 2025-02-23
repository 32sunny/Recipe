import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../style/navbar.css'

export const Navbar = ({ search, setSearch }) => {
  const [loged, setLoged] = useState(false)
  

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoged(true)
    } else {
      setLoged(false)
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setLoged(false); 
    alert('LogOut Successful');
    window.location.reload();
  }

  return (
    <>
     <nav>

        <img src="https://www.pngall.com/wp-content/uploads/8/Cooking-Recipe-PNG-Images.png" />
<div>

        

      <Link to="/" >Home</Link>
      
      {loged ? (
        <>
          <Link to="/" onClick={handleLogout} className='Login'>
            Log Out
          </Link>
        </>
      ) : (
        <Link to="/login" className='Login'>Login</Link>
      )}
</div>
     
      </nav>
    </>
  );
};
