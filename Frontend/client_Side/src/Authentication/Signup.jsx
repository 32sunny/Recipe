import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Signup = () => {
    const [name , setname]  =  useState('')
    const [email , setemail]  =  useState('')
    const [password , setpassword]  =  useState('')

async function HandleSubmit(e){
    e.preventDefault();
   
      
    try {
        const  response =  await axios.post('http://localhost:2000/auth/register' , {
            name,
            email,
            password
        })
        console.log(name)
        console.log(email)
        console.log(password) 
        setname("")
        setemail("")
        setpassword("")

    } catch (error) {
        console.log(
            "something went wrong "
        )
    }


 }


  return (
    <>  
     <h2>Signup</h2>
    <form onSubmit={HandleSubmit}>

    <input type="text"
      value={name}
      onChange={(e)=>setname(e.target.value)}
      placeholder='Enter Username'
      required
       />

<input type="email"
      value={email}
      onChange={(e)=>setemail(e.target.value)}
      placeholder='Enter Email' 
      required
      />

<input type="text"
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      placeholder='Enter Password' 
      required
      />

<button type='Submit'>Submit</button>
    </form>
     
     
      </>
  )
}
