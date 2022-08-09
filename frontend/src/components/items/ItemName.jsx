function ItemName(props) {
  return (
    <span
      className={`element-item-name ${props.isChecked === true ? 'checked' : ''} ${props.isEditing ? 'hidden' : ''}`}
      onClick={props.handleClick}
      id={props.id}      
    >
      {props.name}
    </span>
  )
}

export default ItemName