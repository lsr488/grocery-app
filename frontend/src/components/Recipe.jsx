import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import RecipeForm from './RecipeForm'
import EditRecipe from './EditRecipe'

function Recipe() {
	const [recipes, setRecipes] = useState([{
		name: '',
		notes: '',
		url: '',
		isEditing: false
	}])

	useEffect(() => {
		getRecipes()
	}, [])

	// get recipes from database and setRecipes based on response
	const getRecipes = async () => {
		await axios.get('/api/recipes')
			.then((response) => {
				setRecipes(response.data)
			})
			.catch((error) => console.log('Error', error))
	}

	// delete recipe by id from db
	const deleteRecipe = async (id) => {
		const updatedRecipes = recipes.filter((recipe) => recipe._id !== id)
		await axios.delete(`/api/recipes/${id}`)
		setRecipes(updatedRecipes)
	}

	// changes isEditing status
	const editRecipe = async (e) => {
		const updatedRecipe = recipes.filter((recipe) => recipe._id === e._id)

		updatedRecipe[0].isEditing = !e.isEditing

		await axios.put(`api/recipes/${e._id}`, updatedRecipe[0])
			.catch(error => console.log('Error', error))

		setRecipes([...recipes])
	}

	const handleChange = (e) => {
		e.preventDefault()

	}

	// add new recipe to db
	const addRecipe = async (e) => {
		e.preventDefault()
		
		const recipe = { 
			name: e.target[0].value,
			url: e.target[1].value,
			notes: e.target[2].value,
			isEditing: false
		}

		await axios.post('/api/recipes', recipe)
			.then((response) => setRecipes(prevRecipes => [...prevRecipes, response.data]))
			.catch((error) => console.error('Error', error))

		e.target[0].value = ''
		e.target[1].value = ''
		e.target[2].value = ''
	}

	// splits recipe notes into an array so they can be broken onto own lines
	const splitNotes = (notes => notes.split(';'))

	return (
		<>
			<h2 className="heading">Recipes</h2>
			<RecipeForm 
				recipes={recipes} 
				addRecipe={addRecipe} 
			/>
			<ul>
				{recipes.map((recipe) => (
					<li className="element-container" key={recipe._id}>

						
						{/* display editable form if isEditing is true, else display static element */}

						{/* {recipe.isEditing ? 
							<EditRecipe recipe={recipe} /> : 
		
							//  hyperlink url if it exists  */}
							{recipe.url ? 
							<>
								<span className="element-line-decoration"><FaSquare /></span>
								<span className="element-item-name"><a href={recipe.url}>{recipe.name}</a></span> 
							</> : 
							<>
								<span className="element-line-decoration"><FaSquare /></span>
								<span className="element-item-name">{recipe.name}</span>
							</>
								

					}
						{/* Save Icon */}
						<span
							className={`element-icon-save ${recipe.isEditing ? '' : 'hidden'}`}
							onClick={() => editRecipe(recipe)}
						>
							<FaCheck />
						</span>

						{/* Edit Icon */}
						<span 
							className={`element-icon-edit ${recipe.isEditing ? 'hidden' : ''}`}
							onClick={() => editRecipe(recipe)}
						>
							<FaPen />
						</span>
						
						{/* Delete Icon */}
						<span 
							className={`element-icon-trash ${recipe.isEditing ? 'hidden' : ''}`}
							onClick={() => deleteRecipe(recipe._id)}
						>
							<FaTrash />
						</span>
						
					
						<span className="element-item-notes">
							{splitNotes(recipe.notes).map(note => <div>{note}</div>)}
						</span>

					</li>
				))}
			</ul>
		</>
	)
}

export default Recipe