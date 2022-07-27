import axios from 'axios'
import {useState, useEffect} from 'react'
import ItemForm from './ItemForm'
import ListItem from './ListItem'
import Loading from './Loading'
import RunningTotal from './RunningTotal'

function Item() {
	const [items, setItems] = useState([{
		name: '',
		cost: 0,
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
				console.log('Error', error.response.data)
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
				console.log('Error', error.response.data)
				setIsLoading(prevState => prevState, {status: false})
			})

			setItems([...items])
	}

	// toggles strikethough on item name when clicked
	const strikeThrough = (id) => {
		// e is already the element's ID
		const updatedItems = items.filter((item) => item._id === id)

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
	const editItem = (id) => {
		const updatedItems = items.filter((item) => item._id === id)

		updatedItems.map(item => {
			item.isEditing = !item.isEditing
			return updateSingleItem(item)
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
				console.log('Error', error.response.data)
				setIsLoading(prevState => prevState, {status: false})
			})

		// sets input field back to empty
		e.target.name.value = ''
	}

	// the Save button calls editItem, which handles the PUT request
	const onChange = (e) => {
		let elementValue = e.target.value
		const elementId = e.target.id
		const elementName = e.target.name
	
		const updatedItems = items.filter((item) => item._id === elementId)
		
		updatedItems.map(item => {
			if(elementName === "cost") {
				item[elementName] = parseFloat(elementValue)
			} else {
				item[elementName] = elementValue
			}
			return updateSingleItem(item)
		})

		setItems([...items])
	}
	
	if(!items) {
		console.log("no items")
	}

	const handleClick = (e) => {
		const elementId = e.currentTarget.parentNode.id
		
		if(e.currentTarget.id === 'edit-btn' || e.currentTarget.id === 'save-btn') {
			editItem(elementId)
		}
		
		if(e.currentTarget.id === 'delete-btn') {
			deleteItem(elementId)
		}
				
		if(e.currentTarget.id === 'strike') {
			strikeThrough(elementId)
		}
	}

	return (
			<>
				<h2 className="heading">Items</h2>
				<ItemForm onSubmit={addItem} />

				<ul>
					{isLoading.status === true 
					? <Loading status={isLoading.status} message={isLoading.message} /> 
					: 
						<>
							{items.map((item) => (
								<ListItem 
									key={item._id}
									id={item._id}
									name={item.name}
									cost={item.cost}
									isChecked={item.isChecked}
									isEditing={item.isEditing}
									handleClick={handleClick}
									onChange={onChange}
								/>
							))}
						</>
					}
				</ul>
			<RunningTotal items={items} />
		</>
	)
}

export default Item
