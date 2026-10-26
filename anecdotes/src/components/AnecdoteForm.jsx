import { useAnecdoteActions } from "../anecdoteStore"
import { useNotificationActions } from "../notificationStore"

const AnecdoteForm = () => {
  const { addNew } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleNewAnecdote = event => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    addNew(anecdote)
    setNotification(`'${anecdote}' has been added`)

    event.target.reset()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleNewAnecdote} >
        <div>
          <input data-testid='new' name='anecdote' />
        </div>
        <button style={{ marginTop: 3 }} >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm