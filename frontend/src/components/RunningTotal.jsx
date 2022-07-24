function RunningTotal(props) {

    const itemCosts = []

    // get item costs into an array
    props.items.map(item => {
      return itemCosts.push(item.cost)
    })
  
    // sum values in array
    const itemCostSum = itemCosts.reduce((acc, value) => acc + value, 0).toFixed(2)

  return (
    <>
      {itemCostSum > 0 ? <h4 className="heading">Total: ${itemCostSum}</h4> : null}
    </>    
  )
}

export default RunningTotal
