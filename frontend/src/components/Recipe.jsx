import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import RecipeForm from './RecipeForm'

function Recipe() {
	const [recipes, setRecipes] = useState([{
		name: '',
		notes: '',
		url: ''
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

	const handleChange = (e) => {
		e.preventDefault()
		// console.log("Recipe handleChange:", e.target)
		// console.log("Recipe handleChange:", e.target.name)
		// console.log("Recipe handleChange:", e.target.value)

		setRecipes(prevRecipes => (
			[
				...prevRecipes,
				{
				[e.target.name]: e.target.value
			}])
		)

		// console.log("recipes:", recipes)
	}

	// add new recipe to db
	const addRecipe = async (e) => {
		e.preventDefault()
		
		const recipe = { 
			name: e.target[0].value,
			url: e.target[1].value,
			notes: e.target[2].value
		}

		await axios.post('/api/recipes', recipe)
			.then((response) => setRecipes(prevRecipes => [...prevRecipes, response.data]))
			.catch((error) => console.error('Error', error))

		e.target[0].value = ''
		e.target[1].value = ''
		e.target[2].value = ''
	}

	// splits recipe notes into an array so they can be broken onto own lines
	const splitNotes = (notes) => {
		const splitNotes = notes.split('; ')

		return splitNotes
	}

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
						<span className="element-line-decoration"><FaSquare /></span>

						{recipe.url ? 
							<span className="element-item-name"><a href={recipe.url}>{recipe.name}</a></span> : 
							<span className="element-item-name">{recipe.name}</span>
						}

						<span className="element-icon-edit"><FaPen /></span>
						
						<span 
							className="element-icon-trash"
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