function EditItem(props) {
	return (
    <>
      <form>
        <input 
          className="element-input"
          type="text" 
          id={props.item.id}
          name="name"
          placeholder="Enter item name"
          onChange={props.onChange}
          value={props.item.name}
          required 
        />

        <input
          className="element-input"
          type="number" 
          id={props.item.id}
          name="cost"
          placeholder="Enter item cost"
          onChange={props.onChange}
          value={props.item.cost}
          required 
        />
      </form>
    </>
	)
}

export default EditItem
