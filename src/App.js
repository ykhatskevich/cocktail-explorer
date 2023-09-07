import { useState } from 'react';
import './index.css';


function App() {
  const [cocktailName, setCocktailName] = useState('');
  // 1. the state for storing API response
  const [cocktailData, setCocktailData] = useState(null);
  const [showDescription, setShowDescription] = useState(true);
 
//  2.function to make API request

  const searchCocktail = async () => {
    try {


      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
      const data = await response.json();

      console.log('API Response:', data);
      setCocktailData(data);
      setShowDescription(false);
      

    } catch(error) {
      console.log('Error fetching data:', error);
      
    }
     
  }

  // 3. Event handler for form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCocktail();
    setCocktailName('');
  }


  
  return (
  <div className="app">
   <Logo/>
   
   <CocktailSearch cocktail={cocktailName} onSetCocktailName={setCocktailName} onSubmit={handleSubmit}/>
   
    
    {showDescription && (
        <div>
          <p className="description">
            <span>Welcome to Cocktail Explorer! </span>
            Looking to shake up your evening with a delightful cocktail? You're in the right place!
            Simply enter the name of your favorite cocktail, and we'll fetch the recipe for you. From classic Margaritas to exotic Mai Tais, we've got your cocktail cravings covered.
          </p>
          <img className="description-img" src="/margarita-description.jpeg" alt="margarita"/>
        </div>
      )}
    
   {cocktailData && <Output data={cocktailData}  />}
   {/* <Output /> */}
   </div>
  );
}

export default App;


function Logo() {
  return (<div className="logo"><h1>Cocktail Explorer </h1></div>)
}

function CocktailSearch({cocktail, onSetCocktailName, onSubmit}) {
  
  return <div className="search">
   <form onSubmit={onSubmit}>
    <div className="input-container">
    <label>Search by cocktail name</label>
    <input type="text" value={cocktail} onChange={(e)=>{
      
      onSetCocktailName(e.target.value.toLowerCase())}} ></input>


    </div>
    
    <button className="search-btn">Search</button>

   </form>

  </div>
}





function Output({ data}) {
  if (!data || !data.drinks) {
    return <p className="no-results">Oops, we couldn't find the secret recipe for that one! 🕵️‍♂️ Try another cocktail?</p>;
  }

  const drinks = data.drinks;

  if (!drinks || drinks.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      {drinks.map((drink, index) => (
        <div className="drink-container" key={index} >
          <h2>{drink.strDrink}</h2>
          <img className="drink-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
          <p className="ingredients">
            Ingredients: {" "}
            
            <span>
              {Object.keys(drink)
              .filter((key) => key.startsWith("strIngredient"))
              .map((key) => drink[key])
              .filter(Boolean)
              .join(", ")
              }
              {/* {`${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}`} */}
              
              
              </span>
          </p>
          <p className="instructions">{drink.strInstructions}</p>
          {index !== drinks.length - 1 && <div className="separator"></div>}

        </div>
      ))}
    </div>
  );
}


