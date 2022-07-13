import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import ItemForm from './ItemForm'
import EditItem from './EditItem'

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
		const elementId = e.target.parentNode.id
		const updatedItem = items.filter((item) => item._id === elementId)

		if(updatedItem[0].status === 'false') {
			updatedItem[0].status = 'true'
		} else {
			updatedItem[0].status = 'false'
		}

		await axios.put(`api/items/${elementId}`, updatedItem[0])
			.catch((error) => console.log('Error', error))

			setItems([...items])
	}

	const deleteItem = async (id) => {
		const updatedItems = items.filter((item) => item._id !== id)
		await axios.delete(`/api/items/${id}`)
		setItems(updatedItems)
	}

	// changes isEditing status
	const editItem = async (e) => {
		const updatedItem = items.filter((item) => item._id === e._id)

		updatedItem[0].isEditing = !e.isEditing

		await axios.put(`api/items/${e._id}`, updatedItem[0])
			.catch((error) => console.log('Error', error))

			setItems([...items])
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

	const onChange = async (e) => {
		const value = e.target.value
		const id = e.target.id
	
		const updatedItem = items.filter((item) => item._id === id)

		updatedItem[0].name = value

		await axios.put(`api/items/${id}`, updatedItem[0])
		.catch((error) => console.log('Error', error))

		setItems([...items])
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
						<li className="element-container" key={item._id} id={item._id}>
							<span className="element-line-decoration">
								{/* change between square styles based on item status */}
								{item.status === "true" ? <FaSquare /> : <FaRegSquare />}
							</span>

							{/* display editable form if isEditing is true, otherwise display static element */}
							{item.isEditing ? 
								<EditItem item={item} onChange={onChange} /> : 
								<span
									// strikethrough if clicked
									className={`element-item-name ${item.status === 'true' ? 'checked' : ''} ${item.isEditing ? 'hidden' : ''}`}
									// strikeThrough if clicked and not editing
									onClick={!item.isEditing ? strikeThrough : null}							
									status={item.status}
									value={item.name}
								>{item.name}</span>
							}
							
							{/* Save Icon: set isEditing to false; save icon displays if item is being edited */}
							<span 
								onClick={() => editItem(item)} 
								className={`element-icon-save ${item.isEditing ? '' : 'hidden'}`}
							>
								<FaCheck />
							</span>

							{/* Edit Icon: set isEditing to true; edit icon is displayed if item is not being edited */}
							<span 
								onClick={() => editItem(item)} 
								className={`element-icon-edit ${item.isEditing ? 'hidden' : ''}`}
							>
								<FaPen />
							</span>

							{/* Delete Icon: delete icon is displayed if item is not being edited */}
							<span 
								onClick={() => deleteItem(item._id)} 
								className={`element-icon-trash ${item.isEditing ? 'hidden' : null}`}
							>
								<FaTrash />
							</span>
						</li>
					))}
				</ul>
		</>
	)
}

export default Item
