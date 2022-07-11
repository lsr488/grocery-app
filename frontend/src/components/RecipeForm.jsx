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
            placeholder="Enter notes"
          />          
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>        
      </form>
    </>
  )

}

export default RecipeForm