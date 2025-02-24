import React, { useEffect, useState } from 'react';
import '../style/Home.css';

export const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [DetailsPage, setDetailsPage] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cart, setCart] = useState([]);





      
  
  useEffect(() => {
    FetchData();
    loadCartFromLocalStorage();
  }, []);

  async function FetchData() {
    try {
      let res = await fetch("https://recipe-1dy1.onrender.com/auth/Data");
      let data = await res.json();
      const newData = data.recipes;
      setRecipe(newData);
      setFilteredRecipes(newData);
    } catch (error) {
      console.log("get error:", error);
    }
  }

  useEffect(() => {
    if (search) {
      const filtered = recipe.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipe);
    }
  }, [search, recipe]);

  function viewAllDetails(card) {
    setSelectedCard(card);
    setDetailsPage(true);
  }

  function closeDisplay() {
    setDetailsPage(false);
  }

  function loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }

  function addToCart(item) {

  const token = localStorage.getItem('token')
  if(token){
      let updatedCart = [...cart,  item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      alert("Added to Cart!");
    }else{
      alert('please login first')
    }
    
  } 

  return (
    <div className="full_container">


      <input
        placeholder="Search Here..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        className="search_recipes"
      />

      <div className="container_recips">

        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item, index) => (
            <div key={index} className="recipe_card">

              <img src={item.image} alt="No image" className="recips_image" />

              <p>Name: {item.name}</p>
              <p>Type: {item.cuisine}</p>
              <p>Price: {item.caloriesPerServing}</p>
              <p>Rating: {item.rating}</p>

              <div className='bottom_buttons'>

                <button className="add_to_cart" onClick={() => addToCart(item)}>❤️ Add to Cart</button>
                <button className="Details_recipe" onClick={() => viewAllDetails(item)}>Details</button>
              </div>


              {DetailsPage ? (
                <div className="background_usage">
                  <div className="Detail_page">
                    <img src={selectedCard.image} alt="No image" className="recips_image" />
                    <div>
                      <h3>Name: {selectedCard.name}</h3>
                      <p><span style={{ color: "blue" }}>Ingredients:</span> {selectedCard.ingredients}</p>
                      <p><span style={{ color: "blue" }}>Meal Type:</span> {selectedCard.mealType}</p>
                      <p><span style={{ color: "blue", fontWeight: "bold" }}>Prep Time:</span> {selectedCard.prepTimeMinutes}</p>
                      <p><span style={{ color: "blue" }}>Instructions:</span> {selectedCard.instructions}</p>
                      <p>Price: {selectedCard.caloriesPerServing}</p>
                      <div>
                        <button className="add_to_cart" onClick={() => addToCart(selectedCard)}>❤️ Add to Cart</button>
                        <button onClick={closeDisplay} className="close_Button">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p>Loading Data...</p>
        )}
      </div>
    </div>
  );
};
