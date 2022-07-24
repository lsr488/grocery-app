function RunningTotal(props) {

  const itemCosts = []

  // get item costs into an array
  props.items.map(item => {
    return itemCosts.push(item.cost)
  })

  // sum values in array
  const itemCostsSum = itemCosts.reduce((acc, value) => value + acc, 0)

  return (
    <h3>Total: ${itemCostsSum.toFixed(2)}</h3>
  )
}

export default RunningTotal
