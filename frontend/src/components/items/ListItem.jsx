import {FaRegSquare, FaSquare} from 'react-icons/fa'
import EditItem from './EditItem'
import ItemName from './ItemName'
import ItemCost from './ItemCost'
import ButtonEdit from '../buttons/ButtonEdit'
import ButtonDelete from '../buttons/ButtonDelete'
import ButtonSave from '../buttons/ButtonSave'

function ListItem(props) {
  return (
    <li className="element-container" id={props.id}>
      <span className="element-line-decoration">
        {props.isChecked === true ? <FaSquare /> : <FaRegSquare />}
        </span>

      {/* item name */}
      {/* conditionally renders edit form or name value */}
      {props.isEditing ? 
        // edit item values
        <EditItem item={props} onChange={props.onChange} />
      : 
        <ItemName 
          isChecked={props.isChecked}
          isEditing={props.isEditing}
          name={props.name}
          handleClick={props.handleClick}
          id="name"
        />
      }

      {/* conditionally display cost if greater than 0 */}
      {props.cost > 0 ?
        <ItemCost
          isChecked={props.isChecked}
          isEditing={props.isEditing}
          cost={props.cost}
        />
      : 
        null
      }
      
      {/* edit button, conditional className */}
      <ButtonEdit
        id="edit-btn"
        handleClick={props.handleClick}
        isEditing={props.isEditing}
      />

      {/* delete button, conditional className */}
      <ButtonDelete
        id="delete-btn"
        handleClick={props.handleClick}
        isEditing={props.isEditing}
      />

      {/* save button, conditional className */}
      <ButtonSave
        id="save-btn"
        handleClick={props.handleClick}
        isEditing={props.isEditing}        
      />
    </li>
  )
}

export default ListItem
