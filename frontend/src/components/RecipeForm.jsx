import {useState, useEffect} from 'react'

function RecipeForm(props) {
  // const [newRecipe, setNewRecipe] = useState({
  //   name: '',
  //   notes: '',
  //   url: ''
  // })

  // console.log(props.recipes)


  // const handleChange = (e) => {
  //   console.log("recipe form:", e.target.value)
  //   props.
    
  //   // setNewRecipe({
  //   //   ...newRecipe, 
  //   //   [e.target.name]: e.target.value,
  //   // })
  // }

  return (
    <>
      <form>
        <div>
          <input 
            type="text"
            id="recipe-name"
            name="name"
            value={props.name}
            onChange={props.handleChange}
            placeholder="Enter a recipe name"
          />

          <input 
            type="text"
            id="recipe=url"
            name="url"
            value={props.url}
            onChange={props.handleChange}
            placeholder="Enter a URL"
          />
        </div>

        <div>
          <button type="submit" onSubmit={props.addRecipe}>Submit</button>
        </div>

        {/* <input 
          type="text"
          id="recipe-notes"
          name="notes"
          placeholder="Enter notes"
        /> */}
        
      </form>
    </>
  )

}

export default RecipeForm