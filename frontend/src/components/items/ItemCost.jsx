function ItemCost(props) {
  return (
    <span
      className={`element-item-cost ${props.isChecked === true ? 'checked' : ''} ${props.isEditing ? 'hidden' : ''}`} 
    >
      ${props.cost}
    </span>
  )
}

export default ItemCost