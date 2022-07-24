function EditItem(props) {
	return (
    <>
      <form>
        <input 
          type="text" 
          id={props.item._id}
          name="name"
          placeholder="Enter item name"
          onChange={props.onChange}
          value={props.item.name}
          required 
        />

        <input 
          type="text" 
          id={props.item._id}
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


