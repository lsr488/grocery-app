import axios from 'axios'
import {useState, useEffect} from 'react'
import RecipeForm from './RecipeForm'
import ListRecipe from './ListRecipe'
// import EditRecipe from './EditRecipe'
import Loading from './Loading'

function Recipe() {
	const [recipes, setRecipes] = useState([{
		name: '',
		notes: '',
		url: '',
		isEditing: false
	}])
	const [isLoading, setIsLoading] = useState({
		status: false,
		message: 'Loading...'
	})

	useEffect(() => {
		getRecipes()
	}, [])

	// get recipes from database and setRecipes based on response
	const getRecipes = async () => {
		setIsLoading(prevState => prevState, {status: true})
		await axios.get('/api/recipes')
			.then((response) => {
				setRecipes(response.data)
				setIsLoading(prevState => prevState, {status: false})
			})
			.catch((error) => {
				console.log('Error', error.response.data)
				setIsLoading(prevState => prevState, {status: false})
			})
	}

	// Q: do I need to setRecipes in updateSingleRecipe, editRecipe, AND onChange?
	// update single recipe in database
	const updateSingleRecipe = async (recipe) => {
		setIsLoading(prevState => prevState, {status: true})
		await axios.put(`api/recipes/${recipe._id}`, recipe)
			.then(() => setIsLoading(prevState => prevState, {status: false})
		)
		.catch((error) => {
			console.log('Error', error.response.data)
			setIsLoading(prevState => prevState, {status: false})
		})

		setRecipes([...recipes])
	}

	// delete recipe by id from db
	const deleteRecipe = async (id) => {
		const updatedRecipes = recipes.filter((recipe) => recipe._id !== id)
		await axios.delete(`/api/recipes/${id}`)
		setRecipes(updatedRecipes)
	}

	// changes isEditing status
	const editRecipe = async (id) => {
		console.log(id)
		const updatedRecipes = recipes.filter((recipe) => recipe._id === id)

		updatedRecipes.map(recipe => {
			recipe.isEditing = !recipe.isEditing
			return updateSingleRecipe(recipe)
		})

		setRecipes([...recipes])
	}

	// change recipe values
	const onChange = (e) => {
		const elementValue = e.currentTarget.value
		const elementId = e.currentTarget.id
		const elementName = e.currentTarget.name
		
		const updatedRecipes = recipes.filter(recipe => recipe._id === elementId)
		
		updatedRecipes.map(recipe => {
			recipe[elementName] = elementValue
			return updateSingleRecipe(recipe)
		})

		setRecipes([...recipes])
	}

	// add new recipe to db
	const addRecipe = async (e) => {
		e.preventDefault()
		
		const elementName = e.target.name.value
		const elementUrl = e.target.url.value
		const elementNotes = e.target.notes.value

		const recipe = { 
			name: elementName,
			url: elementUrl,
			notes: elementNotes,
			isEditing: false
		}

		await axios.post('/api/recipes', recipe)
			.then((response) => {
				setRecipes(prevRecipes => [...prevRecipes, response.data])
				setIsLoading(prevState => prevState, {status: false})
			})
			.catch((error) => {
				console.log('Error', error.response.data)
				setIsLoading(prevState => prevState, {status: false})
			})
			
		e.target.name.value = ''
		e.target.url.value = ''
		e.target.notes.value = ''
	}

	const handleClick = (e) => {
		const elementId = e.currentTarget.parentNode.id
		
		if(e.currentTarget.id === 'edit-btn' || e.currentTarget.id === 'save-btn') {
			editRecipe(elementId)
		}
		
		if(e.currentTarget.id === 'delete-btn') {
			deleteRecipe(elementId)
		}
	}

	return (
		<>
			<h2 className="heading">Recipes</h2>
			<RecipeForm 
				recipes={recipes} 
				addRecipe={addRecipe} 
			/>
			<ul>

				{isLoading.status === true 
				? <Loading status={isLoading.status} message={isLoading.message} /> 
				:
					<>
						{/* Q: why does Recipes need the index to act as the key, but Items is OK with _id? */}
						{recipes.map((recipe, index) => (
							<ListRecipe  
								key={index}
								id={recipe._id}
								name={recipe.name}
								url={recipe.url}
								notes={recipe.notes}
								isEditing={recipe.isEditing}
								handleClick={handleClick}
								onChange={onChange}
							/>
						))}
					</>
				}
			</ul>
		</>
	)
}

export default Recipe