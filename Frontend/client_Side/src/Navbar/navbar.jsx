import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import { useEffect  } from 'react';


export const Navbar = () => {

   const[loged , setloged] = useState('')


    useEffect(() => {
    const token = localStorage.getItem("token");
    setloged(token)
    if(token){
        console.log(loged)
    }
    else{
        console.log(" logout ")

    }
    }, [loged]);
   
  function handleLogout() {
    localStorage.removeItem("token");
    alert("LogOut SuccessFull")
    window.location.reload();
  }

  return (
    <>
    <Link to='/' >Home</Link>
    <Link to='/login' >Login</Link>
    <Link to='/signup' >Sign Up</Link>
    <Link to='/' onClick={handleLogout} >Log Out 😊 </Link>

    </>
  )
}
