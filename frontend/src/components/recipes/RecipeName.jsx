function RecipeName(props) {
  return (
    <span className="element-recipe-name">
      {props.url ? <a href={props.url}>{props.name}</a> : props.name}
    </span>
  )
}

export default RecipeName