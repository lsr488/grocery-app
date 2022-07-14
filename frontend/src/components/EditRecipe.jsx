function RecipeForm(props) {
  return (
    <>
      <form>
        <div>
          <input 
            type="text"
            id="recipe-name"
            name="name"
            placeholder="Enter a recipe name"
            value={props.recipe.name}
          />
          
          <details>
            <summary className="more-text">More</summary>
            <div>
              <input 
                type="text"
                id="recipe=url"
                name="url"
                placeholder="Enter a URL"
                value={props.recipe.url}
                />
            </div>

            <div>  
              <input 
                type="text"
                id="recipe-notes"
                name="notes"
                placeholder="Enter notes. Separate with semicolon"
                value={props.recipe.notes}
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