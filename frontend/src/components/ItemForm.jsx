import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import Item from './Item'

function ItemForm() {
	const [items, setItems] = useState([{
		name: '',
		status: false
	}])

	useEffect(() => {
		getItems()
	}, [])

	const getItems = async () => {
		await axios.get('/api/items')
			.then((response) => {
				setItems(response.data)
				console.log(response.data)

			})
			.catch((error) => console.log('Error', error))
	}


	const {name, status} = items

	// make onSubmit?
	const onChange = (e) => {
		e.preventDefault();
		// setItems((prevState) => ({
		// 	...prevState,
		// 	[e.target.name]: e.target.value
		// }))
	}

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target)
		// setData(e.target.)
	}
	// const newItem = async (name) => {
	// 	await axios.post('/api/items', {newItem})
	// 		.then((response) => {console.log(response)})
	// 		.catch((error) => {console.log('Error', error)})

	// }

// // Create new ticket
// const createTicket = async (ticketData, token) => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`
// 		}
// 	}

	// const response = await axios.post(API_URL, ticketData, config)

	// return response.data

	if(!items) {
		console.log("no items")
	}

	return (
			<>
				<h2>Item Form</h2>
				<section className="form">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Enter item name" required />
						</div>
						<div className="form-group">
							<button className="btn">Submit</button>
						</div>

						<ul>
						{items.map((item) => (
							<li className="items" key={item._id}><FaRegSquare />
								 {item.name} <span className="icons"><FaPen /> <FaTrash /></span>
							</li>
							// <p>{JSON.stringify(item)}</p>
						))}
						</ul>

{/*					{items.map((item) => (
						<Item key={item._id} id={item._id} item={item} />
					))}
*/}

					</form>
				</section>


			</>
	)
}

export default ItemForm


