function EditRecipe(props) {

  return (
    <>
      <form>
          <input 
            type="text"
            id={props.recipe._id}
            name="name"
            placeholder="Enter a recipe name"
            value={props.recipe.name}
            onChange={props.onChange}
          />
          
          <input 
            type="text"
            id={props.recipe._id}
            name="url"
            placeholder="Enter a URL"
            value={props.recipe.url}
            onChange={props.onChange}
            />

          <input 
            type="text"
            id={props.recipe._id}
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