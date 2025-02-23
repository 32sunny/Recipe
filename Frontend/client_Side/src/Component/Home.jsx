import React, { useEffect, useState } from 'react';

export const Home = () => {
  const [recipe, setRecipe] = useState([]);

  async function FetchData() {
    try {
      let res = await fetch("http://localhost:2000/auth");
      let data = await res.json();
     const newData =  data.recipes
     console.log(newData)
     setRecipe(newData)
    
    } catch (error) {
      console.log("get error:", error);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
    <h2>Home</h2>
      {recipe.length > 0 ? (
        recipe.map((item, index) => (
            <div key={index}>
          <p>{item.cuisine}</p>
          </div>
        ))
      ) : (
        <p>Loading Data...</p>
      )}
    </>
  );
};
