function EditRecipe(props) {
  return (
    <>
      <form>
          <input 
            className="element-input"
            type="text"
            id={props.recipe.id}
            name="name"
            placeholder="Enter a recipe name"
            value={props.recipe.name}
            onChange={props.onChange}
          />
          
          <input 
            className="element-input"
            type="text"
            id={props.recipe.id}
            name="url"
            placeholder="Enter a URL"
            value={props.recipe.url}
            onChange={props.onChange}
            />

          <input 
            className="element-input"
            type="text"
            id={props.recipe.id}
            name="notes"
            placeholder="Enter notes. Separate with semicolon"
            value={props.recipe.notes}
            onChange={props.onChange}
            />
      </form>
    </>
  )
}

export default EditRecipe