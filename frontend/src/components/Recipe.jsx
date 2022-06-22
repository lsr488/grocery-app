import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'

function Recipe() {
	const [recipes, setRecipes] = useState([{
		name: '',
		notes: '',
		url: ''
	}])

	useEffect(() => {
				getRecipes()
		}, [])

		// get items from database and setItems based on response
	const getRecipes = async () => {
		await axios.get('/api/recipes')
			.then((response) => {
				setRecipes(response.data)
			})
			.catch((error) => console.log('Error', error))
	}

	console.log(recipes)


	return (
		<div>
			<h2>Recipes</h2>
			<ul>
				{recipes.map(recipe => (
					<li>{recipe.name}
						<li>{recipe.url}</li>
						<li>{recipe.notes}</li>
					</li>
				))}
			</ul>	
		</div>
		
	)
}

export default Recipe