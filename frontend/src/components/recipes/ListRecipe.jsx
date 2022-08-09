import {FaSquare} from 'react-icons/fa'
import EditRecipe from './EditRecipe'
import ButtonEdit from '../buttons/ButtonEdit'
import ButtonDelete from '../buttons/ButtonDelete'
import ButtonSave from '../buttons/ButtonSave'
import RecipeName from './RecipeName'
import RecipeNotes from './RecipeNotes'

function ListRecipe(props) {
  return (
    <li className="element-container" id={props.id}>
      <span className="element-line-decoration"><FaSquare /></span>

      {/* display editable form if isEditing is true, else display static element */}
      {props.isEditing
        ? <EditRecipe recipe={props} onChange={props.onChange}/>
        :
        <>
          {/* hyperlink recipe if url exists */}
          <RecipeName
            url={props.url}
            name={props.name}
          />

          {/* display notes if they exist*/}
          {props.notes 
          ? <RecipeNotes
              notes={props.notes}
            />
          : null
          }


        </>
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

export default ListRecipe