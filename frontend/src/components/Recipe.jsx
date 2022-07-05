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

	return (
		<div>
		<h2 className="recipe-heading">Recipes</h2>
			<ul>
				{recipes.map((recipe) => (
					<li className="recipe-list" key={recipe._id}><FaSquare />
						{recipe.url ? 
							<span className="recipe-list-item" id={recipe._id}><a href={recipe.url}>{recipe.name}</a></span> : 
							<span className="recipe-list-item">{recipe.name}</span>
						}
						<span className="recipe-list-notes">{recipe.notes}</span>
					</li>
				))}
				</ul>
		</div>
	)
}

export default Recipe