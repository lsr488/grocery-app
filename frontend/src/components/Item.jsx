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

	const getItems = async () => {
		await axios.get('/api/items')
			.then((response) => {
				setItems(response.data)
				console.log(response.data)

			})
			.catch((error) => console.log('Error', error))
	}

	const onDelete = async (thisItem) => {
		const updatedItems = items.filter((item) => item._id !== thisItem._id)
		await axios.delete(`/api/items/${thisItem._id}`)
		setItems(updatedItems)
	}

	if(!items) {
		console.log("no items")
	}

	return (
			<>
				<h2>Items</h2>
					<div>
						<ul>
							{items.map((item) => (
								<li key={item._id} status={item.status}><FaRegSquare />
									<span className={`items ${item.status === 'true' ? 'checked' : ''}`}>{item.name} </span>
									<span><span><FaPen /></span> <span onClick={() => onDelete(item)}><FaTrash /></span></span>
								</li>
							))}
							</ul>
					</div>
			</>
	)
}

export default Item
