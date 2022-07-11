import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import ItemForm from './ItemForm'

function Item() {
	const [items, setItems] = useState([{
		name: '',
		status: '',
		isEditing: '',
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

	const deleteItem = async (id) => {
		const updatedItems = items.filter((item) => item._id !== id)
		await axios.delete(`/api/items/${id}`)
		setItems(updatedItems)
	}

	// edit name of item and change CSS background color
	const editItem = async (e) => {
		// console.log(e)
		// changeName(e)
		const updatedItem = items.filter((item) => item._id === e._id)

		updatedItem[0].isEditing = !e.isEditing

		await axios.put(`api/items/${e._id}`, updatedItem[0])
			.catch((error) => console.log('Error', error))

		setItems([...items])
	}

	const onChange = () => {

	}

	const changeName = (item) => {
		console.log(item.name)
	}

	// add item to db
	const addItem = async (e) => {
		e.preventDefault()

		const item = {name: e.target[0].value}

		await axios.post('/api/items', item)
			.then((response) => setItems(prevItems => [...prevItems, response.data]))
			.catch((error) => console.log('Error', error))

		// sets input field back to empty
		e.target[0].value = ''
	}

	if(!items) {
		console.log("no items")
	}

	return (
			<>
				<ItemForm onSubmit={addItem}/>

				<h2 className="heading">Items</h2>
				<ul>
					{items.map((item) => (
						<li className="element-container" key={item._id}>
							<span className="element-line-decoration">
								{item.status === "true" ? <FaSquare /> : <FaRegSquare />}
							</span>
							<span
								// className={`element-item-name ${item.status === 'true' ? 'checked' : null}`}
								className={`element-item-name ${item.status === 'true' ? 'checked' : null} ${item.isEditing ? 'editing' : null}`}
								// onClick={strikeThrough}
								onClick={!item.isEditing ? strikeThrough : null}
								// contentEditable={item.isEditing}
								status={item.status}
								id={item._id}
								value={item.name}
							>{item.name}</span>
							<span onClick={() => editItem(item)} className={`element-icon-save ${item.isEditing ? null : 'hidden'}`}><FaCheck /></span>
							<span onClick={() => editItem(item)} className={`element-icon-edit ${item.isEditing ? 'hidden' : null}`}><FaPen /></span>
							<span onClick={() => deleteItem(item._id)} className={`element-icon-trash ${item.isEditing ? 'hidden' : null}`}><FaTrash /></span>
						</li>
					))}
				</ul>
		</>
	)
}

export default Item
