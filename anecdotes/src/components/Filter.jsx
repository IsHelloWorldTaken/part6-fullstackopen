import { useActions } from "../anecdoteStore"

const Filter = () => {
  const { setFilter } = useActions()

  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <strong>Filter</strong> <input onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter