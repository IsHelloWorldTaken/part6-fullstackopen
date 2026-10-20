import { useAddNew } from "../store"

const AnecdoteForm = () => {
  const add = useAddNew()

  const handleNewAnecdote = event => {
    event.preventDefault()

    const anecdote = event.target.newAnecdote.value
    add(anecdote)

    event.target.reset()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewAnecdote} >
        <div>
          <input data-testid='new' name='newAnecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm