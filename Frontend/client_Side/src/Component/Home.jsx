import React, { useEffect } from 'react'

export const Home = () => {

    async function FetchData(){
        console.log("run")
        try {
            let res = await fetch("http://localhost:2000/auth");
            let data = res.json();
            console.log(data)
        } catch (error) {
            console.log("get error:", error)
        }
    }
 

    useEffect(()=>{
        FetchData()
    },[])

  return (
  
       <>
       <div>Home</div>
       </>
     
  )
}
