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
		<>
			<h2 className="heading">Recipes</h2>
			<ul>
				{recipes.map((recipe) => (
					<li className="element-container" key={recipe._id}><FaSquare />
						{recipe.url ? 
							<span className="element-item-name" id={recipe._id}><a href={recipe.url}>{recipe.name}</a></span> : 
							<span className="element-item-name" id={recipe._id}>{recipe.name}</span>
						}

						<span className="element-icon-edit"><FaPen /></span>
						<span className="element-icon-trash"><FaTrash /></span>
						<span className="element-item-notes">{recipe.notes}</span>
					</li>
				))}
			</ul>
		</>
	)
}

export default Recipe