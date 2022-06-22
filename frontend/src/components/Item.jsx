import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'

function Item() {
	const [items, setItems] = useState([{
		name: '',
		status: '',
		_id: ''
	}])

	useEffect(() => {
		getItems()
	}, [])

	// get items from database and setItems based on response
	const getItems = async () => {
		await axios.get('/api/items')
			.then((response) => {
				setItems(response.data)
			})
			.catch((error) => console.log('Error', error))
	}

	// toggles strikethough on item name when clicked
	const strikeThrough = async (e) => {
		const updatedItem = items.filter((item) => item._id === e.target.id)

		if(updatedItem[0].status === 'false') {
			updatedItem[0].status = 'true'
		} else {
			updatedItem[0].status = 'false'
		}

		// e.target.classList.toggle('checked')

		await axios.put(`api/items/${e.target.id}`, updatedItem[0])
			.catch((error) => console.log('Error', error))

		setItems([...items])
	}

	const onDelete = async (id) => {
		const updatedItems = items.filter((item) => item._id !== id)
		await axios.delete(`/api/items/${id}`)
		setItems(updatedItems)
	}

  const onChange = (e) => {}


	const addItem = async (e) => {
		e.preventDefault()

		const item = {name: e.target[0].value}

		await axios.post('/api/items', item)
			.then((response) => setItems(prevItems => [...prevItems, response.data]))
			.catch((error) => console.log('Error', error))
	}

	if(!items) {
		console.log("no items")
	}

	return (
			<>
				{/*<h2>Item Form</h2>*/}
					<form onSubmit={addItem}>
						<div>
							<input
								type="text"
								id="name"
								name="name"
								onChange={onChange}
								placeholder="Enter item name"
								required 
							/>
						</div>
						<div>
							<button type="submit">Submit</button>
						</div>
					</form>

				<h2>Items</h2>
					<div>
						<ul>
							{items.map((item) => (
								<li key={item._id}><FaRegSquare />
									<span
										className={`items ${item.status === 'true' ? 'checked' : ''}`}
										onClick={strikeThrough}
										status={item.status}
										id={item._id}
									>{item.name} </span>
										<span onClick={() => onDelete(item._id)} className="icons"><FaTrash /></span>
								</li>
							))}
							</ul>
					</div>
			</>
	)
}

export default Item
