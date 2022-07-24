function RunningTotal(props) {

    const itemCosts = []

    // get item costs into an array
    props.items.map(item => {
      return itemCosts.push(item.cost)
    })
  
    // sum values in array
    const itemCostSum = itemCosts.reduce((acc, value) => acc + value, 0).toFixed(2)

  return (
    <h4 className="heading">Total: ${itemCostSum}</h4>
  )
}

export default RunningTotal
