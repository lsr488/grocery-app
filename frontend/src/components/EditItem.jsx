function EditItem(props) {
	return (
    <input 
      type="text" 
      id={props.item._id}
      name="name"
      placeholder="Enter item name"
      onChange={props.onChange}
      value={props.item.name}
      required 
    />
	)
}

export default EditItem


