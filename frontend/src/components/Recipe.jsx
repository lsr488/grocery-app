import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'

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
			<h2 className="recipe-heading">Recipes</h2>
			<div>
				{recipes.map(recipe => (
					<div key={recipe.id}>
						{recipe.url ? 
							<p className="recipe-items"><FaSquare /><a href={recipe.url}>{recipe.name}</a></p> : 
							<p className="recipe-items"><FaSquare />{recipe.name}</p>
						}
						<p className="recipe-notes">{recipe.notes}</p>
					</div>
				))}
			</div>	
		</div>
		
	)
}

export default Recipe