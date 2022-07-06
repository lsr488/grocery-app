// import ItemForm from '../components/ItemForm'
import Item from '../components/Item'
import Recipe from '../components/Recipe'

function Home() {
	return (
		<>
			<section className="heading">
				<h1>Grocery App</h1>
				<Item />
				<Recipe />
			</section>
		</>
	)
}

export default Home
