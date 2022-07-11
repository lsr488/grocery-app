function RecipeForm(props) {
  return (
    <>
      <form onSubmit={props.addRecipe}>
        <div>
          <input 
            type="text"
            id="recipe-name"
            name="name"
            placeholder="Enter a recipe name"
          />
          
          <details>
            <summary className="more-text">More</summary>
            <div>
              <input 
                type="text"
                id="recipe=url"
                name="url"
                placeholder="Enter a URL"
              />
              
              <input 
                type="text"
                id="recipe-notes"
                name="notes"
                placeholder="Enter notes. Separate with semicolon"
              />          
            </div>
          </details>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>        
      </form>
    </>
  )

}

export default RecipeForm