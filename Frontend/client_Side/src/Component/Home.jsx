import React, { useEffect, useState } from 'react';
import '../style/Home.css'

export const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('')


  async function FetchData() {
    try {
      let res = await fetch("http://localhost:2000/auth");
      let data = await res.json();
     const newData =  data.recipes
     console.log(newData)
     setRecipe(newData)
     setFilteredRecipes(newData);
    
    } catch (error) {
      console.log("get error:", error);
    }
  }

  useEffect(() => {
    if (search) {
   
      const filtered = recipe.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipe); 
    }
  }, [search, recipe]);


  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>

         <div className='full_container'> 
           <input
          placeholder='Search Product Here...'
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            className='search_recipes'
           />

    <div className='container_recips'>
      
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((item, index) => (
            <div key={index} className='recipe_card'>
               <img src={item.image} alt='No image' className='recips_image' /> 
          <p>Name :{item.name}</p>
          <p>Type :{item.cuisine}</p>
          <p>Price : {item.caloriesPerServing}</p>
          <p>Rating :{item.rating}</p>
          
          </div>
        ))
      ) : (
        <p>Loading Data...</p>
      )}
</div>
</div>
    </>
  );
};
