import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import RecipeForm from './RecipeForm'
import EditRecipe from './EditRecipe'
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
				console.log('Error', error)
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
			console.log('Error', error)
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
	const editRecipe = async (e) => {
		const updatedRecipes = recipes.filter((recipe) => recipe._id === e._id)

		updatedRecipes.map(recipe => {
			recipe.isEditing = !recipe.isEditing
			return updateSingleRecipe(recipe)
		})

		setRecipes([...recipes])
	}

	// change recipe values
	const onChange = (e) => {
		const elementValue = e.target.value
		const elementId = e.target.id
		const elementName = e.target.name
		
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
				console.log('Error', error)
				setIsLoading(prevState => prevState, {status: false})
			})
			
		e.target.name.value = ''
		e.target.url.value = ''
		e.target.notes.value = ''
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

				{isLoading.status === true ? <Loading status={isLoading.status} message={isLoading.message} /> :
					<>
						{/* Q: why does Recipes need the index to act as the key, but Items is OK with _id? */}
						{recipes.map((recipe, index) => (
							<li className="element-container" key={index}>
								<span className="element-line-decoration"><FaSquare /></span>

								{/* display editable form if isEditing is true, else display static element */}
								{recipe.isEditing ? 
									<EditRecipe recipe={recipe} onChange={onChange} /> : 
									<>
										{/* hyperlink recipe name if URL exists */}
										<span className="element-recipe-name">
											{recipe.url ? <a href={recipe.url}>{recipe.name}</a> : recipe.name}
										</span>

										{/* display notes if they exist */}
										{recipe.notes ? 
											<span className="element-recipe-notes">
												{splitNotes(recipe.notes).map((note, index) => <div key={index}>{note}</div>)}
											</span> :
											null
										}
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

							</li>
						))}
					</>
				}
			</ul>
		</>
	)
}

export default Recipe