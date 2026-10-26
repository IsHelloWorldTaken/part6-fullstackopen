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
    setNotification(`You voted for '${anecdote.content}'`)
  }

  const handleRemove = id => event => {
    event.preventDefault()

    if (window.confirm(`Remove '${anecdoteObject.content}'?`)) {
      remove(id)
      setNotification('Anecdote removed')
    }
  }

  const removeButton = () => (
    <button style={style} onClick={handleRemove(anecdoteObject.id)}>
      Remove
    </button>
  )

  return (
    <div style={{ marginBottom: 10 }}>
      <div><strong>{anecdoteObject.content}</strong></div>
      <div>
        Has {anecdoteObject.votes}
        <button style={style} onClick={handleVote(anecdoteObject)}>Vote</button>
        {!anecdoteObject.votes && removeButton()}
      </div>
    </div>

  )
}

export default Anecdote