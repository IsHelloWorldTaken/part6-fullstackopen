import { useAnecdoteActions } from "../anecdoteStore"
import { useNotificationActions } from "../notificationStore"

const Anecdote = ({ anecdoteObject }) => {
  const { vote, remove } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const style = {
    marginLeft: 3
  }

  const handleVote = anecdote => event => {
    event.preventDefault()
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
  }

  const handleRemove = id => event => {
    event.preventDefault()
    remove(id)
    setNotification('Anecdote removed')
  }

  const removeButton = () => (
    <button style={style} onClick={handleRemove(anecdoteObject.id)}>
      delete
    </button>
  )

  return (
    <div style={{ marginBottom: 10 }}>
      <div>{anecdoteObject.content}</div>
      <div>
        has {anecdoteObject.votes}
        <button style={style} onClick={handleVote(anecdoteObject)}>vote</button>
        {!anecdoteObject.votes && removeButton()}
      </div>
    </div>

  )
}

export default Anecdote