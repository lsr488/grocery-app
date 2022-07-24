import axios from 'axios'
import {useState, useEffect} from 'react'
import {FaRegSquare, FaSquare, FaPen, FaCheck, FaTrash} from 'react-icons/fa'
import ItemForm from './ItemForm'
import EditItem from './EditItem'
import Loading from './Loading'

function Item() {
	const [items, setItems] = useState([{
		name: '',
		isChecked: false,
		isEditing: '',
		_id: ''
	}])
	const [isLoading, setIsLoading] = useState({
		status: false,
		message: 'Loading...'
	})

	useEffect(() => {
		getItems()
	}, [])

	// get items from database and setItems based on response
	const getItems = async () => {
		setIsLoading(prevState => prevState, {status: true})
		await axios.get('/api/items')
			.then((response) => {
				setItems(response.data)
				setIsLoading(prevState => prevState, {status: false})
			})
			.catch((error) => {
				console.log('Error', error)
				setIsLoading(prevState => prevState, {status: false})
			})
	}
	
	// updates single item in database
	const updateSingleItem = async (item) => {
		setIsLoading(prevState => prevState, {status: true})
		await axios.put(`api/items/${item._id}`, item)
			.then(() => setIsLoading(prevState => prevState, {status: false})
			)
			.catch((error) => {
				console.log('Error', error)
				setIsLoading(prevState => prevState, {status: false})
			})

			setItems([...items])
	}

	// toggles strikethough on item name when clicked
	const strikeThrough = (e) => {
		const elementId = e.target.parentNode.id
		const updatedItems = items.filter((item) => item._id === elementId)

		updatedItems.map(item => {
			item.isChecked = !item.isChecked
			updateSingleItem(item)
			return item
		})
	}

	const deleteItem = async (id) => {
		const updatedItems = items.filter((item) => item._id !== id)
		await axios.delete(`/api/items/${id}`)
		setItems(updatedItems)
	}

	// changes isEditing status
	const editItem = (e) => {
		const updatedItems = items.filter((item) => item._id === e._id)

		updatedItems.map(item => {
			item.isEditing = !item.isEditing
			updateSingleItem(item)
			return item
		})
	}

	// add item to db
	const addItem = async (e) => {
		e.preventDefault()

		setIsLoading(prevState => prevState, {status: true})

		// get value of item name from form
		const formName = e.target.name.value
		const item = {name: formName}

		await axios.post('/api/items', item)
			.then((response) => {
				setItems(prevItems => [...prevItems, response.data])
				setIsLoading(prevState => prevState, {status: false})
			})
			.catch((error) => {
				console.log('Error', error)
				setIsLoading(prevState => prevState, {status: false})
			})

		// sets input field back to empty
		e.target.name.value = ''
	}

	// the Save button calls editItem, which handles the PUT request
	const onChange = (e) => {
		const elementValue = e.target.value
		const elementId = e.target.id
		const elementName = e.target.name
	
		const updatedItems = items.filter((item) => item._id === elementId)
		
		updatedItems.map(item => {
			item[elementName] = elementValue
			updateSingleItem(item)
			return item
		})

		setItems([...items])
	}
	
	if(!items) {
		console.log("no items")
	}

	return (
			<>
				<ItemForm onSubmit={addItem} />

				<h2 className="heading">Items</h2>
				<ul>
					{isLoading.status === true ? <Loading status={isLoading.status} message={isLoading.message} /> : 
						<>
							{items.map((item) => (
								<li className="element-container" key={item._id} id={item._id}>
									{/* change between square styles based on item status */}
									<span className="element-line-decoration">
										{item.isChecked === true ? <FaSquare /> : <FaRegSquare />}
									</span>
		
									{/* display editable form if isEditing is true, otherwise display static element */}
									{item.isEditing ? 
										<EditItem item={item} onChange={onChange} /> : 
										<span
											// strikethrough if clicked
											className={`element-item-name ${item.isChecked === true ? 'checked' : ''} ${item.isEditing ? 'hidden' : ''}`}
											// strikeThrough if clicked and not editing
											onClick={!item.isEditing ? strikeThrough : null}							
											// why do we need to pass in item.isChecked here...?
											// isChecked={item.isChecked}
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
						</>
					}
				</ul>
		</>
	)
}

export default Item
